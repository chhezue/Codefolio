import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';
import { CreateAlgorithmDto, UpdateAlgorithmDto } from './dto/algorithm.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @ApiOperation({ summary: '모든 알고리즘 포스트 출력' })
  @Get()
  getAlgorithms() {
    return this.algorithmService.getAlgorithms();
  }

  @ApiOperation({ summary: '특정 알고리즘 포스트 출력' })
  @Get('/:id')
  getAlgorithm(@Param('id') id: string) {
    return this.algorithmService.getAlgorithm(id);
  }

  @ApiOperation({ summary: '알고리즘 포스트 등록' })
  @Post()
  createAlgorithm(@Body() createAlgorithmDto: CreateAlgorithmDto) {
    return this.algorithmService.createAlgorithm(createAlgorithmDto);
  }

  @ApiOperation({ summary: '알고리즘 포스트 수정' })
  @Patch('/:id')
  updateAlgorithm(@Param('id') id: string, @Body() updateAlgorithm: UpdateAlgorithmDto) {
    return this.algorithmService.updateAlgorithm(id, updateAlgorithm);
  }

  @ApiOperation({ summary: '알고리즘 포스트 삭제' })
  @Delete('/:id')
  deleteAlgorithm(@Param('id') id: string) {
    return this.algorithmService.deleteAlgorithm(id);
  }

  @ApiOperation({ summary: '포스트 검색' })
  @Get('/:search')
  searchAlgorithm(@Query('search') search: string) {
    return this.algorithmService.searchAlgorithm(search);
  }
}
