import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Query,
} from "@nestjs/common";
import {
  FilesInterceptor,
} from "@nestjs/platform-express";
import { ProjectService } from "@project/project.service";
import {
  CreateProjectDto,
  UpdateProjectDto,
} from "@project/dto/project.dto";
import { projectMulterOptions } from "@config/multer.config";

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // 모든 프로젝트 포스트 출력
  @Get()
  async findAll(
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
  async findOne(@Param("id") id: string) {
    return this.projectService.getProject(id);
  }

  // 프로젝트 포스트 등록
  @Post()
  @UseInterceptors(FilesInterceptor("files", 3, projectMulterOptions))
  create(
    @Body() createDto: CreateProjectDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.projectService.create(createDto, files);
  }

  // 프로젝트 포스트 수정
  @Put("/:id")
  @UseInterceptors(FilesInterceptor("files", 3, projectMulterOptions))
  async update(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles()
    files: Express.Multer.File[]
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  // 프로젝트 포스트 삭제
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await this.projectService.deleteProject(id);
  }
}
