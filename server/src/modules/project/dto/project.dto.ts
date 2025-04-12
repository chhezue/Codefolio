import { IsString, IsArray, IsNotEmpty, IsOptional, IsUrl, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '프로젝트 제목' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '프로젝트 요약' })
  summary: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: '깃허브 URL' })
  githubUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '프로젝트 기간' })
  period: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '담당 역할' })
  role: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ description: '사용 기술', type: [String] })
  technologies: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: '메인 페이지 고정 여부', required: false })
  pin?: boolean;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: '프로젝트 기능',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: { type: 'string', nullable: true },
        description: { type: 'string', nullable: true },
        imageUrl: { type: 'string' },
        imageAlt: { type: 'string' }
      }
    }
  })
  features: {
    title?: string | null;
    description?: string | null;
    imageUrl: string;
    imageAlt: string;
  }[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: '프로젝트 해결 과제',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        number: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' }
      }
    }
  })
  challenges: {
    number: number;
    title: string;
    description: string;
  }[];
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '프로젝트 제목', required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '프로젝트 요약', required: false })
  summary?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({ description: '깃허브 URL', required: false })
  githubUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '프로젝트 기간', required: false })
  period?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '담당 역할', required: false })
  role?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ description: '사용 기술', type: [String], required: false })
  technologies?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: '메인 페이지 고정 여부', required: false })
  pin?: boolean;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: '프로젝트 기능',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: { type: 'string', nullable: true },
        description: { type: 'string', nullable: true },
        imageUrl: { type: 'string' },
        imageAlt: { type: 'string' }
      }
    }
  })
  features?: {
    title?: string | null;
    description?: string | null;
    imageUrl: string;
    imageAlt: string;
  }[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: '프로젝트 해결 과제',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        number: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' }
      }
    }
  })
  challenges?: {
    number: number;
    title: string;
    description: string;
  }[];
}

export class GetProjectDto {
  id: number;
  title: string;
  summary: string;
  githubUrl: string;
  period: string;
  role: string;
  technologies: string[];
  pin: boolean;
  features: {
    title?: string | null;
    description?: string | null;
    imageUrl: string;
    imageAlt: string;
  }[];
  challenges: {
    number: number;
    title: string;
    description: string;
  }[];
} 