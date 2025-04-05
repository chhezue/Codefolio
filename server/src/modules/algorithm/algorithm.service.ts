import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Algorithm } from './algorithm.entity';
import { CreateAlgorithmDto, UpdateAlgorithmDto, GetAlgorithmDto } from './dto/algorithm.dto';

@Injectable()
export class AlgorithmService {
    constructor(
        @InjectRepository(Algorithm)
        private readonly algorithmRepository: Repository<Algorithm>,
    ) {}

    async getAlgorithms(): Promise<GetAlgorithmDto[]> {
        return await this.algorithmRepository.find({
            order: {
                created_at: 'DESC',
                updated_at: 'DESC',
            },
        });
    }

    async getAlgorithm(id: string): Promise<GetAlgorithmDto> {
        const algorithm = await this.algorithmRepository.findOne({ where: { id: parseInt(id) } });
        if (!algorithm) {
            throw new NotFoundException(`Algorithm ${id} not found.`);
        }
        return algorithm;
    }

    async createAlgorithm(createAlgorithmDto: CreateAlgorithmDto): Promise<GetAlgorithmDto> {
        const newAlgorithm = this.algorithmRepository.create(createAlgorithmDto);
        return await this.algorithmRepository.save(newAlgorithm);
    }

    async updateAlgorithm(id: string, updateAlgorithmDto: UpdateAlgorithmDto): Promise<GetAlgorithmDto> {
        await this.algorithmRepository.update(id, updateAlgorithmDto);
        return await this.getAlgorithm(id);
    }

    async deleteAlgorithm(id: string) {
        const result = await this.algorithmRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Algorithm ${id} not found.`);
        }
    }

    async searchAlgorithm(search: string): Promise<GetAlgorithmDto[]> {
        return await this.algorithmRepository.find({
            where: [
                { title: Like(`%${search}%`) },
                { content: Like(`%${search}%`) },
                { tags: Like(`%${search}%`) },
            ],
        });
    }
}