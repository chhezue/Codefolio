import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFiles, ParseIntPipe, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProjectService } from '@project/project.service';
import { CreateProjectDto, UpdateProjectDto, GetProjectDto } from '@project/dto/project.dto';
import { ApiOperation, ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { projectMulterOptions } from '../../config/multer.config';

@ApiTags('프로젝트')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '모든 프로젝트 포스트 출력' })
  @ApiResponse({ status: 200, description: '모든 프로젝트 포스트 목록' })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('pinned') pinned?: boolean
  ) {
    return this.projectService.findAll(page, limit, pinned);
  }

  @ApiOperation({ summary: '메인 페이지용 핀된 프로젝트 출력' })
  @ApiResponse({ status: 200, description: '핀된 프로젝트 목록' })
  @Get('/pinned')
  getPinnedProjects() {
    return this.projectService.getPinnedProjects();
  }

  @ApiOperation({ summary: '특정 프로젝트 포스트 출력' })
  @ApiParam({ name: 'id', description: '프로젝트 ID' })
  @ApiResponse({ status: 200, description: '프로젝트 포스트 상세 정보' })
  @ApiResponse({ status: 404, description: '프로젝트 포스트를 찾을 수 없음' })
  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @ApiOperation({ summary: '프로젝트 포스트 등록' })
  @ApiResponse({ status: 201, description: '프로젝트 포스트 생성 완료' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'features[0][imageFile]', maxCount: 1 },
      { name: 'features[1][imageFile]', maxCount: 1 },
      { name: 'features[2][imageFile]', maxCount: 1 },
      { name: 'screenshots[0][imageFile]', maxCount: 1 },
      { name: 'screenshots[1][imageFile]', maxCount: 1 },
      { name: 'screenshots[2][imageFile]', maxCount: 1 },
    ], projectMulterOptions)
  )
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() files: {
      'features[0][imageFile]'?: Express.Multer.File[];
      'features[1][imageFile]'?: Express.Multer.File[];
      'features[2][imageFile]'?: Express.Multer.File[];
      'screenshots[0][imageFile]'?: Express.Multer.File[];
      'screenshots[1][imageFile]'?: Express.Multer.File[];
      'screenshots[2][imageFile]'?: Express.Multer.File[];
    }
  ) {
    return this.projectService.create(createProjectDto, files);
  }

  @ApiOperation({ summary: '프로젝트 포스트 수정' })
  @ApiParam({ name: 'id', description: '프로젝트 ID' })
  @ApiResponse({ status: 200, description: '프로젝트 포스트 수정 완료' })
  @ApiResponse({ status: 404, description: '프로젝트 포스트를 찾을 수 없음' })
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'features[0][imageFile]', maxCount: 1 },
      { name: 'features[1][imageFile]', maxCount: 1 },
      { name: 'features[2][imageFile]', maxCount: 1 },
      { name: 'screenshots[0][imageFile]', maxCount: 1 },
      { name: 'screenshots[1][imageFile]', maxCount: 1 },
      { name: 'screenshots[2][imageFile]', maxCount: 1 },
    ], projectMulterOptions)
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() files: {
      'features[0][imageFile]'?: Express.Multer.File[];
      'features[1][imageFile]'?: Express.Multer.File[];
      'features[2][imageFile]'?: Express.Multer.File[];
      'screenshots[0][imageFile]'?: Express.Multer.File[];
      'screenshots[1][imageFile]'?: Express.Multer.File[];
      'screenshots[2][imageFile]'?: Express.Multer.File[];
    }
  ) {
    return this.projectService.update(id, updateProjectDto, files);
  }

  @ApiOperation({ summary: '프로젝트 포스트 삭제' })
  @ApiParam({ name: 'id', description: '프로젝트 ID' })
  @ApiResponse({ status: 200, description: '프로젝트 포스트 삭제 완료' })
  @ApiResponse({ status: 404, description: '프로젝트 포스트를 찾을 수 없음' })
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }
}
