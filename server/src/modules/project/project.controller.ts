import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '모든 프로젝트 포스트 출력' })
  @Get()
  getProjects() {
    return this.projectService.getProjects();
  }

  @ApiOperation({ summary: '특정 프로젝트 포스트 출력' })
  @Get('/:id')
  getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }

  @ApiOperation({ summary: '프로젝트 포스트 등록' })
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @ApiOperation({ summary: '프로젝트 포스트 수정' })
  @Patch('/:id')
  updateProject(@Param('id') id: string, @Body() updateProject: UpdateProjectDto) {
    return this.projectService.updateProject(id, updateProject);
  }

  @ApiOperation({ summary: '프로젝트 포스트 삭제' })
  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
