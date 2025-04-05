import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '@project/project.entity';
import { CreateProjectDto, UpdateProjectDto, GetProjectDto } from '@project/dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async getProjects(): Promise<GetProjectDto[]> {
        return await this.projectRepository.find({
            order: {
                created_at: 'DESC',
                updated_at: 'DESC',
            },
        });
    }

    async getProject(id: string): Promise<GetProjectDto> {
        const project = await this.projectRepository.findOne({ where: { id: parseInt(id) } });
        if (!project) {
            throw new NotFoundException(`Project ${id} not found.`);
        }
        return project;
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<GetProjectDto> {
        const newProject = this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(newProject);
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<GetProjectDto> {
        await this.projectRepository.update(id, updateProjectDto);
        return await this.getProject(id);
    }

    async deleteProject(id: string) {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Project ${id} not found.`);
        }
    }
}