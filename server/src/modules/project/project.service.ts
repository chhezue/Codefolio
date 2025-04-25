import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Project } from "@project/project.entity";
import {
  CreateProjectDto,
  UpdateProjectDto,
} from "@project/dto/project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async getProjects(page: number, limit: number, stack?: string) {
    // 쿼리 조건 설정
    const queryOptions: any = {
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    };

    // 스택 필터링 적용
    if (stack) {
      const stacksArray = stack.split(",");
      queryOptions.where = {
        stack: In(stacksArray),
      };
    }

    // 쿼리 실행
    const [items, total] =
      await this.projectRepository.findAndCount(queryOptions);

    // 결과 반환
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStacks() {
    // 모든 프로젝트에서 stack 필드만 가져옴
    const projects = await this.projectRepository.find({
      select: ["stack"],
    });

    // 모든 프로젝트의 스택을 하나의 배열로 펼치고 중복 제거
    const allStacks = projects.flatMap((project) => project.stack);
    const uniqueStacks = [...new Set(allStacks)];

    // 정렬된 스택 목록 반환
    return uniqueStacks.sort();
  }

  async getPinnedProjects(): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: { pin: true },
      take: 3,
    });

    if (!projects) {
      throw new NotFoundException("고정된 프로젝트를 찾을 수 없습니다.");
    }

    return projects;
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
    // 고정 3개 검증 로직 실행
    if (createProjectDto.pin) {
      await this.validatePinLimit();
    }

    const featureUrls = files.featureImages.map(
      (f) => `/uploads/${f.filename}`
    );
    const screenshotUrls = files.screenshotImages.map(
      (f) => `/uploads/${f.filename}`
    );

    const features = createProjectDto.features.map((feature, i) => ({
      ...feature,
      imageUrl: featureUrls[i] ?? null,
    }));

    const screenshots = createProjectDto.screenshots.map((screenshot, i) => ({
      ...screenshot,
      imageUrl: screenshotUrls[i] ?? null,
    }));

    return await this.projectRepository.save({
      ...createProjectDto,
      features,
      screenshots,
    });
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
    files?: {
      featureImages?: Express.Multer.File[];
      screenshotImages?: Express.Multer.File[];
    }
  ): Promise<Project> {
    // 고정 3개 검증 로직 실행
    if (updateProjectDto.pin) {
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project?.pin) {
        await this.validatePinLimit();
      }
    }

    const featureUrls =
      files?.featureImages?.map((f) => `/uploads/${f.filename}`) ?? [];
    const screenshotUrls =
      files?.screenshotImages?.map((f) => `/uploads/${f.filename}`) ?? [];

    const features =
      updateProjectDto.features?.map((feature, i) => ({
        ...feature,
        imageUrl: featureUrls[i] ?? null,
      })) ?? [];

    const screenshots =
      updateProjectDto.screenshots?.map((screenshot, i) => ({
        ...screenshot,
        imageUrl: screenshotUrls[i] ?? null,
      })) ?? [];

    await this.projectRepository.update(id, {
      ...updateProjectDto,
      features,
      screenshots,
    });

    // 업데이트된 프로젝트 찾아서 반환
    const updatedProject = await this.projectRepository.findOne({
      where: { id },
    });

    if (!updatedProject) {
      throw new NotFoundException(`${id} 프로젝트를 찾을 수 없습니다.`);
    }

    return updatedProject;
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
