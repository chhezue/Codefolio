import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';
import { CreateAlgorithmDto } from './dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from './dto/update-algorithm.dto';

@Controller('algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @Post()
  create(@Body() createAlgorithmDto: CreateAlgorithmDto) {
    return this.algorithmService.create(createAlgorithmDto);
  }

  @Get()
  findAll() {
    return this.algorithmService.findAll();
  }

  @Get('tags')
  findByTags(@Query('tags') tags: string) {
    const tagArray = tags.split(',');
    return this.algorithmService.findByTags(tagArray);
  }

  @Get('difficulty/:difficulty')
  findByDifficulty(@Param('difficulty') difficulty: string) {
    return this.algorithmService.findByDifficulty(difficulty);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.algorithmService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlgorithmDto: UpdateAlgorithmDto) {
    return this.algorithmService.update(id, updateAlgorithmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.algorithmService.remove(id);
  }
}
