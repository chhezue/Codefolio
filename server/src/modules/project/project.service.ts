import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

    async getProjects(page: number, limit: number) {
        const [items, total] = await this.projectRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { created_at: 'DESC' },
        });

        return {
            items,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getPinnedProjects(): Promise<GetProjectDto[]> {
        return await this.projectRepository.find({
            where: { pin: true },
            take: 3, // 최대 3개까지 가져옴
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
        // pin=true로 설정하려는 경우 이미 3개가 있는지 확인
        if (createProjectDto.pin) {
            await this.validatePinLimit();
        }
        
        const newProject = this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(newProject);
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<GetProjectDto> {
        // pin=true로 업데이트하려는 경우 확인
        if (updateProjectDto.pin) {
            const project = await this.projectRepository.findOne({ where: { id: parseInt(id) } });
            // 현재 프로젝트가 이미 핀되어 있지 않고, 핀하려는 경우에만 검증
            if (!project.pin) {
                await this.validatePinLimit();
            }
        }
        
        await this.projectRepository.update(id, updateProjectDto);
        return await this.getProject(id);
    }

    async deleteProject(id: string) {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Project ${id} not found.`);
        }
    }

    // 핀된 프로젝트가 이미 3개인지 확인하는 헬퍼 메서드
    private async validatePinLimit() {
        const pinnedCount = await this.projectRepository.count({ where: { pin: true } });
        if (pinnedCount >= 3) {
            throw new BadRequestException('이미 3개의 프로젝트가 메인 페이지에 고정되어 있습니다. 다른 프로젝트의 고정을 해제한 후 다시 시도해주세요.');
        }
    }
}