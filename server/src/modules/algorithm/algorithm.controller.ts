import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlgorithmService } from '@algorithm/algorithm.service';
import { CreateAlgorithmDto, UpdateAlgorithmDto } from '@algorithm/dto/algorithm.dto';
import { ApiOperation, ApiTags, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('알고리즘')
@Controller('algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @ApiOperation({ summary: '모든 알고리즘 포스트 출력' })
  @ApiResponse({ status: 200, description: '모든 알고리즘 포스트 목록' })
  @Get()
  getAlgorithms(
      @Query('page') page: number,
      @Query('limit') limit: number,
  ) {
    return this.algorithmService.getAlgorithms(page, limit);
  }

  @ApiOperation({ summary: '특정 알고리즘 포스트 출력' })
  @ApiParam({ name: 'id', description: '알고리즘 포스트 ID' })
  @ApiResponse({ status: 200, description: '알고리즘 포스트 상세 정보' })
  @ApiResponse({ status: 404, description: '알고리즘 포스트를 찾을 수 없음' })
  @Get('/:id')
  getAlgorithm(@Param('id') id: string) {
    return this.algorithmService.getAlgorithm(id);
  }

  @ApiOperation({ summary: '알고리즘 포스트 등록' })
  @ApiResponse({ status: 201, description: '알고리즘 포스트 생성 완료' })
  @Post()
  createAlgorithm(@Body() createAlgorithmDto: CreateAlgorithmDto) {
    return this.algorithmService.createAlgorithm(createAlgorithmDto);
  }

  @ApiOperation({ summary: '알고리즘 포스트 수정' })
  @ApiParam({ name: 'id', description: '알고리즘 포스트 ID' })
  @ApiResponse({ status: 200, description: '알고리즘 포스트 수정 완료' })
  @ApiResponse({ status: 404, description: '알고리즘 포스트를 찾을 수 없음' })
  @Patch('/:id')
  updateAlgorithm(@Param('id') id: string, @Body() updateAlgorithm: UpdateAlgorithmDto) {
    return this.algorithmService.updateAlgorithm(id, updateAlgorithm);
  }

  @ApiOperation({ summary: '알고리즘 포스트 삭제' })
  @ApiParam({ name: 'id', description: '알고리즘 포스트 ID' })
  @ApiResponse({ status: 200, description: '알고리즘 포스트 삭제 완료' })
  @ApiResponse({ status: 404, description: '알고리즘 포스트를 찾을 수 없음' })
  @Delete('/:id')
  deleteAlgorithm(@Param('id') id: string) {
    return this.algorithmService.deleteAlgorithm(id);
  }

  @ApiOperation({ summary: '포스트 검색' })
  @ApiQuery({ name: 'search', description: '검색어' })
  @ApiResponse({ status: 200, description: '검색 결과' })
  @Get('/:search')
  searchAlgorithm(@Query('search') search: string) {
    return this.algorithmService.searchAlgorithm(search);
  }
}
