import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Project } from "@project/project.entity";
import { CreateProjectDto, UpdateProjectDto } from "@project/dto/project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async getProjects(page: number, limit: number, stack?: string) {
    try {
      // 기본 쿼리 옵션
      const skip = (page - 1) * limit;

      // 쿼리 빌더 생성
      let queryBuilder = this.projectRepository
        .createQueryBuilder("project")
        .skip(skip)
        .take(limit)
        .orderBy("project.createdAt", "DESC");

      // 스택 필터링 적용
      if (stack) {
        queryBuilder = queryBuilder.where(
          ":stack = ANY(project.technologies)",
          { stack }
        );
      }

      // 쿼리 실행
      const [items, total] = await queryBuilder.getManyAndCount();

      // 결과 반환
      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error("프로젝트 조회 중 오류 발생:", error);
      throw new InternalServerErrorException(
        "프로젝트 조회 중 오류가 발생했습니다."
      );
    }
  }

  async getStacks() {
    // 모든 프로젝트에서 technologies 필드만 가져옴
    const projects = await this.projectRepository.find({
      select: ["technologies"],
    });

    // 모든 프로젝트의 스택을 하나의 배열로 펼치고 중복 제거
    const allStacks = projects.flatMap((project) => project.technologies);
    const uniqueStacks = [...new Set(allStacks)];

    // 정렬된 스택 목록 반환
    return uniqueStacks.sort();
  }

  async getPinnedProjects(): Promise<Project[]> {
    try {
      console.log("고정된 프로젝트 조회 시작");
      const projects = await this.projectRepository.find({
        where: { pin: true },
        order: { createdAt: "DESC" },
        take: 3,
      });

      console.log(`고정된 프로젝트 ${projects.length}개 조회 완료`);

      if (projects.length === 0) {
        console.log("고정된 프로젝트가 없습니다.");
        return [];
      }

      return projects;
    } catch (error) {
      console.error("고정된 프로젝트 조회 중 오류 발생:", error);
      throw error;
    }
  }

  async getProject(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`${id} 프로젝트를 찾을 수 없습니다.`);
    }

    return project;
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    files: {
      featureImages: Express.Multer.File[];
      screenshotImages: Express.Multer.File[];
    }
  ): Promise<Project> {
    try {
      console.log("Project Service - createProject 시작");

      // 고정 3개 검증 로직 실행
      const isPinned = createProjectDto.pin === "true";
      if (isPinned) {
        await this.validatePinLimit();
        console.log("[로그] 핀 검증 완료, 고정 가능");
      }

      console.log("파일 정보 변환 시작");
      const featureUrls = files.featureImages.map(
        (f) => `/uploads/${f.filename}`
      );
      const screenshotUrls = files.screenshotImages.map(
        (f) => `/uploads/${f.filename}`
      );

      console.log("변환된 URL:", { featureUrls, screenshotUrls });

      const features = createProjectDto.features.map((feature, i) => ({
        ...feature,
        imageUrl: featureUrls[i] ?? null,
      }));

      const screenshots = createProjectDto.screenshots.map((screenshot, i) => ({
        ...screenshot,
        imageUrl: screenshotUrls[i] ?? null,
      }));

      console.log("프로젝트 DB 저장 시작");
      const result = await this.projectRepository.save({
        ...createProjectDto,
        pin: isPinned,
        features,
        screenshots,
      });
      console.log("프로젝트 DB 저장 완료");

      return result;
    } catch (error) {
      console.error("Project Service - createProject 오류:", error);
      throw error;
    }
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
    files?: {
      featureImages?: Express.Multer.File[];
      screenshotImages?: Express.Multer.File[];
    }
  ): Promise<Project> {
    try {
      console.log(
        `[로그] 프로젝트 업데이트 시작: ${projectId}, 파일 첨부 여부:`,
        {
          featureImages: files?.featureImages?.length || 0,
          screenshotImages: files?.screenshotImages?.length || 0,
        }
      );
      console.log(
        `[로그] 프로젝트 DTO:`,
        JSON.stringify(updateProjectDto, null, 2)
      );

      const project = await this.projectRepository.findOne({
        where: { id: projectId },
      });

      if (!project) {
        console.log(`[오류] 프로젝트를 찾을 수 없음: ${projectId}`);
        throw new NotFoundException(`프로젝트를 찾을 수 없습니다.`);
      }

      console.log("[로그] 기존 프로젝트 조회 성공", project.id);

      // pin 값 업데이트 전 검증
      if (updateProjectDto.pin && !project.pin) {
        console.log("[로그] 핀 상태 변경 요청: true");
        const pinnedProjectsCount = await this.projectRepository.count({
          where: { pin: true },
        });

        console.log(`[로그] 현재 핀된 프로젝트 수: ${pinnedProjectsCount}`);
        if (pinnedProjectsCount >= 3) {
          console.log("[오류] 핀 고정된 프로젝트 한도 초과");
          throw new BadRequestException("최대 3개까지만 고정할 수 있습니다.");
        }
      }

      // 단순 필드 업데이트
      const updatedFields = [];
      if (updateProjectDto.title) {
        project.title = updateProjectDto.title;
        updatedFields.push("title");
      }
      if (updateProjectDto.summary) {
        project.summary = updateProjectDto.summary;
        updatedFields.push("summary");
      }
      if (updateProjectDto.githubUrl) {
        project.githubUrl = updateProjectDto.githubUrl;
        updatedFields.push("githubUrl");
      }
      if (updateProjectDto.role) {
        project.role = updateProjectDto.role;
        updatedFields.push("role");
      }
      if (updateProjectDto.hasOwnProperty("pin")) {
        // pin 값을 boolean으로 변환
        project.pin = updateProjectDto.pin === "true";
        updatedFields.push(`pin (${project.pin})`);
      }

      console.log("[로그] 업데이트된 필드:", updatedFields.join(", "));

      // 기술 스택 업데이트
      if (updateProjectDto.technologies) {
        console.log(
          "[로그] 기술 스택 업데이트:",
          updateProjectDto.technologies.join(", ")
        );
        // 기술 스택 배열 직접 업데이트 (문자열 배열)
        project.technologies = updateProjectDto.technologies;
        updatedFields.push("technologies");
      }

      // 파일이 제공된 경우 이미지 URL 업데이트 처리
      if (
        files &&
        (files.featureImages?.length || files.screenshotImages?.length)
      ) {
        console.log("[로그] 이미지 파일 처리");

        // 기능 이미지 처리
        if (files.featureImages?.length) {
          console.log(
            "[로그] 기능 이미지 파일 처리:",
            files.featureImages.length
          );
          const featureUrls = files.featureImages.map(
            (f) => `/uploads/${f.filename}`
          );

          // 기존 features 정보가 없는 경우 초기화
          if (!project.features) {
            project.features = [];
          }

          // 각 이미지 URL을 해당 feature에 연결
          featureUrls.forEach((url, index) => {
            if (index < project.features.length) {
              project.features[index].imageUrl = url;
            }
          });
        }

        // 스크린샷 이미지 처리
        if (files.screenshotImages?.length) {
          console.log(
            "[로그] 스크린샷 이미지 파일 처리:",
            files.screenshotImages.length
          );
          const screenshotUrls = files.screenshotImages.map(
            (f) => `/uploads/${f.filename}`
          );

          // 기존 screenshots 정보가 없는 경우 초기화
          if (!project.screenshots) {
            project.screenshots = [];
          }

          // 각 이미지 URL을 해당 screenshot에 연결
          screenshotUrls.forEach((url, index) => {
            if (index < project.screenshots.length) {
              project.screenshots[index].imageUrl = url;
            }
          });
        }
      }

      // 저장 및 반환
      console.log("[로그] 프로젝트 저장 전:", project.id);
      const updatedProject = await this.projectRepository.save(project);
      console.log("[로그] 프로젝트 업데이트 완료");

      return updatedProject;
    } catch (error) {
      console.error("[오류] 프로젝트 업데이트 중 예외 발생:");
      console.error(`- 메시지: ${error.message}`);
      console.error(`- 스택: ${error.stack}`);

      if (error instanceof NotFoundException) {
        console.error("- 유형: NotFoundException (찾을 수 없음)");
        throw error;
      }
      if (error instanceof BadRequestException) {
        console.error("- 유형: BadRequestException (잘못된 요청)");
        throw error;
      }

      console.error("- 유형: 일반 오류, 서버 내부 오류로 변환");
      throw new InternalServerErrorException(
        "프로젝트 업데이트 중 오류가 발생했습니다: " + error.message
      );
    }
  }

  async deleteProject(id: string) {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`${id} 프로젝트를 찾을 수 없습니다.`);
    }
  }

  // 고정된 프로젝트가 3개인지 확인하는 메소드
  private async validatePinLimit() {
    const pinnedCount = await this.projectRepository.count({
      where: { pin: true },
    });
    if (pinnedCount >= 3) {
      throw new BadRequestException(
        "이미 3개의 프로젝트가 메인 페이지에 고정되어 있습니다. 다른 프로젝트의 고정을 해제한 후 다시 시도해주세요."
      );
    }
  }
}
