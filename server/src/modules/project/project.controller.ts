import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ProjectService } from "@project/project.service";
import { CreateProjectDto, UpdateProjectDto } from "@project/dto/project.dto";
import { projectMulterOptions } from "@config/multer.config";

// 허용되는 이미지 파일 확장자 목록
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg"];

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // 모든 프로젝트 포스트 출력
  @Get()
  async getProjects(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    return this.projectService.getProjects(page, limit);
  }

  // 메인 페이지용 핀된 프로젝트 출력
  @Get("/pin")
  getPinnedProjects() {
    return this.projectService.getPinnedProjects();
  }

  // 특정 프로젝트 포스트 출력
  @Get("/:id")
  async getProject(@Param("id") id: string) {
    return this.projectService.getProject(id);
  }

  // 프로젝트 포스트 등록
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "featureImages", maxCount: 4 },
        { name: "screenshotImages", maxCount: 3 },
      ],
      projectMulterOptions
    )
  )
  createProject(
    @Body() createDto: CreateProjectDto,
    @UploadedFiles()
    files: {
      featureImages?: Express.Multer.File[];
      screenshotImages?: Express.Multer.File[];
    }
  ) {
    // 필수 파일이 없는 경우 에러 처리
    if (!files?.featureImages?.length || !files?.screenshotImages?.length) {
      throw new BadRequestException("이미지는 필수입니다.");
    }

    // 파일 확장자 추가 검증
    this.validateFileExtensions([
      ...(files.featureImages || []),
      ...(files.screenshotImages || []),
    ]);

    return this.projectService.createProject(createDto, {
      featureImages: files.featureImages,
      screenshotImages: files.screenshotImages,
    });
  }

  // 프로젝트 포스트 수정
  @Put("/:id")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "featureImages", maxCount: 4 },
        { name: "screenshotImages", maxCount: 3 },
      ],
      projectMulterOptions
    )
  )
  async updateProject(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles()
    files: {
      featureImages?: Express.Multer.File[];
      screenshotImages?: Express.Multer.File[];
    }
  ) {
    // 파일이 제공된 경우 확장자 검증
    if (files?.featureImages?.length || files?.screenshotImages?.length) {
      this.validateFileExtensions([
        ...(files.featureImages || []),
        ...(files.screenshotImages || []),
      ]);
    }

    return this.projectService.updateProject(id, updateProjectDto, {
      featureImages: files.featureImages,
      screenshotImages: files.screenshotImages,
    });
  }

  // 프로젝트 포스트 삭제
  @Delete("/:id")
  async deleteProject(@Param("id") id: string) {
    return await this.projectService.deleteProject(id);
  }

  // 파일 확장자 검증 메서드
  private validateFileExtensions(files: Express.Multer.File[]) {
    for (const file of files) {
      const ext = file.originalname
        .toLowerCase()
        .slice(file.originalname.lastIndexOf("."));
      if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
        throw new BadRequestException(
          `지원하지 않는 파일 확장자입니다: ${ext}. 허용되는 확장자: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`
        );
      }
    }
  }
}
