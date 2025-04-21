import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "@project/project.entity";
import {
  CreateProjectDto,
  GetProjectDto,
  UpdateProjectDto,
} from "@project/dto/project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async getProjects(page: number, limit: number) {
    const [items, total] = await this.projectRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPinnedProjects(): Promise<GetProjectDto[]> {
    const projects = await this.projectRepository.find({
      where: { pin: true },
      take: 3,
    });

    if (!projects) {
      throw new NotFoundException("고정된 프로젝트를 찾을 수 없습니다.");
    }

    return projects;
  }

  async getProject(id: string): Promise<GetProjectDto> {
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
  ): Promise<GetProjectDto> {
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
  ): Promise<GetProjectDto> {
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
    const updatedProject = await this.projectRepository.findOne({
      where: { id },
    });
    return updatedProject ?? null;
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
