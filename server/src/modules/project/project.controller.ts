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
  Headers,
  UnauthorizedException,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ProjectService } from "@project/project.service";
import { CreateProjectDto, UpdateProjectDto } from "@project/dto/project.dto";
import { projectMulterOptions } from "@config/multer.config";
import { AuthService } from "@auth/auth.service";

// 허용되는 이미지 파일 확장자 목록
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg"];

@Controller("projects")
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly authService: AuthService
  ) {}

  // 모든 프로젝트 포스트 출력
  @Get()
  async getProjects(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("stack") stack?: string
  ) {
    return this.projectService.getProjects(page, limit, stack);
  }

  // 모든 기술 스택 반환
  @Get("/stacks")
  async getStacks() {
    return this.projectService.getStacks();
  }

  // 메인 페이지용 핀된 프로젝트 출력
  @Get("/pin")
  async getPinnedProjects() {
    const pinnedProjects = await this.projectService.getPinnedProjects();
    return {
      items: pinnedProjects,
      total: pinnedProjects.length,
    };
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
    @Headers("Authorization") auth: string,
    @Body() createDto: CreateProjectDto,
    @UploadedFiles()
    files: {
      featureImages?: Express.Multer.File[];
      screenshotImages?: Express.Multer.File[];
    }
  ) {
    try {
      console.log("파일 수신 확인:", {
        featureImages: files?.featureImages?.length || 0,
        screenshotImages: files?.screenshotImages?.length || 0,
      });

      // 토큰 검증
      const token = auth?.split(" ")[1]; // 'Bearer xxx'
      if (!this.authService.verifyToken(token)) {
        throw new UnauthorizedException("관리자 권한이 없습니다.");
      }

      // 필수 파일이 없는 경우 에러 처리
      if (!files?.featureImages?.length || !files?.screenshotImages?.length) {
        throw new BadRequestException("이미지는 필수입니다.");
      }

      // 파일 확장자 추가 검증
      this.validateFileExtensions([
        ...(files.featureImages || []),
        ...(files.screenshotImages || []),
      ]);

      console.log("파일 검증 완료, 프로젝트 생성 시작");
      return this.projectService.createProject(createDto, {
        featureImages: files.featureImages,
        screenshotImages: files.screenshotImages,
      });
    } catch (error) {
      console.error("프로젝트 생성 중 오류 발생:", error);
      throw error;
    }
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
    @Headers("Authorization") auth: string,
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles()
    files: {
      featureImages?: Express.Multer.File[];
      screenshotImages?: Express.Multer.File[];
    }
  ) {
    // 토큰 검증
    const token = auth?.split(" ")[1]; // 'Bearer xxx'
    if (!this.authService.verifyToken(token)) {
      throw new UnauthorizedException("관리자 권한이 없습니다.");
    }

    // 파일이 제공된 경우 확장자 검증
    if (files?.featureImages?.length || files?.screenshotImages?.length) {
      this.validateFileExtensions([
        ...(files.featureImages || []),
        ...(files.screenshotImages || []),
      ]);
    }

    return this.projectService.updateProject(id, updateProjectDto, files);
  }

  // 프로젝트 포스트 삭제
  @Delete("/:id")
  async deleteProject(
    @Headers("Authorization") auth: string,
    @Param("id") id: string
  ) {
    // 토큰 검증
    const token = auth?.split(" ")[1]; // 'Bearer xxx'
    if (!this.authService.verifyToken(token)) {
      throw new UnauthorizedException("관리자 권한이 없습니다.");
    }
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
