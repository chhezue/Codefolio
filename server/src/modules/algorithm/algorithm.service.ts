import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Algorithm } from './algorithm.schema';
import { CreateAlgorithmDto } from './dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from './dto/update-algorithm.dto';

@Injectable()
export class AlgorithmService {
  constructor(
    @InjectModel(Algorithm.name) private algorithmModel: Model<Algorithm>,
  ) {}

  async findAll() {
    return this.algorithmModel.find().exec();
  }

  async findOne(id: string) {
    const algorithm = await this.algorithmModel.findById(id).exec();
    
    if (!algorithm) {
      throw new NotFoundException(`Algorithm with ID ${id} not found`);
    }
    
    // 조회수 증가
    algorithm.viewCount += 1;
    await algorithm.save();
    
    return algorithm;
  }

  async create(createAlgorithmDto: CreateAlgorithmDto) {
    const newAlgorithm = new this.algorithmModel(createAlgorithmDto);
    return newAlgorithm.save();
  }

  async update(id: string, updateAlgorithmDto: UpdateAlgorithmDto) {
    const updatedAlgorithm = await this.algorithmModel
      .findByIdAndUpdate(id, updateAlgorithmDto, { new: true })
      .exec();
    
    if (!updatedAlgorithm) {
      throw new NotFoundException(`Algorithm with ID ${id} not found`);
    }
    
    return updatedAlgorithm;
  }

  async remove(id: string) {
    const result = await this.algorithmModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`Algorithm with ID ${id} not found`);
    }
    
    return { id };
  }

  async findByTags(tags: string[]) {
    return this.algorithmModel.find({ tags: { $in: tags } }).exec();
  }

  async findByDifficulty(difficulty: string) {
    return this.algorithmModel.find({ difficulty }).exec();
  }
}
