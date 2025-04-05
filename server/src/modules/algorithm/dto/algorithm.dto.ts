import {IsString, IsArray, IsEnum, IsNotEmpty, IsOptional} from 'class-validator';
import { DifficultyLevel } from "@algorithm/dto/common/difficulty-level.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlgorithmDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '글 제목' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '포스트 내용' })
  content: string;

  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  @ApiProperty({ description: '난이도', enum: DifficultyLevel })
  difficulty: DifficultyLevel;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '사용 언어' })
  language: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ description: '포스트 태그' })
  tags: string[];
}

export class UpdateAlgorithmDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(DifficultyLevel)
  @IsOptional()
  difficulty?: DifficultyLevel;

  @IsString()
  @IsOptional()
  language?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class GetAlgorithmDto {
  id: number;
  title: string;
  content: string;
  difficulty: DifficultyLevel;
  language: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}