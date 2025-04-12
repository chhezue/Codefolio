import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from '@project/project.service';
import { CreateProjectDto, UpdateProjectDto } from '@project/dto/project.dto';
import { ApiOperation, ApiQuery, ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('프로젝트')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '모든 프로젝트 포스트 출력' })
  @ApiResponse({ status: 200, description: '모든 프로젝트 포스트 목록' })
  @Get()
  getProjects() {
    return this.projectService.getProjects();
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
  getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }

  @ApiOperation({ summary: '프로젝트 포스트 등록' })
  @ApiResponse({ status: 201, description: '프로젝트 포스트 생성 완료' })
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @ApiOperation({ summary: '프로젝트 포스트 수정' })
  @ApiParam({ name: 'id', description: '프로젝트 ID' })
  @ApiResponse({ status: 200, description: '프로젝트 포스트 수정 완료' })
  @ApiResponse({ status: 404, description: '프로젝트 포스트를 찾을 수 없음' })
  @Patch('/:id')
  updateProject(@Param('id') id: string, @Body() updateProject: UpdateProjectDto) {
    return this.projectService.updateProject(id, updateProject);
  }

  @ApiOperation({ summary: '프로젝트 포스트 삭제' })
  @ApiParam({ name: 'id', description: '프로젝트 ID' })
  @ApiResponse({ status: 200, description: '프로젝트 포스트 삭제 완료' })
  @ApiResponse({ status: 404, description: '프로젝트 포스트를 찾을 수 없음' })
  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
