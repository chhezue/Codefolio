import { IsString, IsArray, IsUrl, IsBoolean, IsOptional, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

// 기본 프로젝트 정보 DTO (공통 속성)
export class ProjectBaseDto {
  @IsString()
  @IsNotEmpty()
  title: string; // 프로젝트 제목

  @IsString()
  @IsNotEmpty()
  summary: string; // 프로젝트 요약

  @IsUrl()
  @IsNotEmpty()
  githubUrl: string; // 깃허브 url

  @IsString()
  @IsNotEmpty()
  period: string; // 프로젝트 기간

  @IsString()
  @IsNotEmpty()
  role: string; // 담당 역할

  @IsArray()
  @IsString({ each: true })
  technologies: string[]; // 사용 기술 스택

  @IsBoolean()
  pin: boolean; // 메인 페이지 고정 여부
}

// 주요 기능 DTO
export class FeatureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  imageAlt: string;
}

// 도전 과제 DTO
export class ChallengeDto {
  @IsNumber()
  number: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

// 실제 구현 화면 DTO
export class ScreenshotDto {
  @IsString()
  @IsNotEmpty()
  imageAlt: string;
}

// 프로젝트 생성 DTO
export class CreateProjectDto extends ProjectBaseDto {
  @IsArray()
  @IsNotEmpty()
  @Type(() => FeatureDto)
  features: (FeatureDto & {
    imageFile: Express.Multer.File;
  })[]; // 주요 기능

  @IsArray()
  @IsNotEmpty()
  @Type(() => ChallengeDto)
  challenges: ChallengeDto[]; // 어려움과 해결 과정

  @IsArray()
  @IsOptional()
  @Type(() => ScreenshotDto)
  screenshots?: (ScreenshotDto & {
    imageFile: Express.Multer.File;
  })[]; // 실제 구현 화면

  // 추가 필드: 시작 날짜와 종료 날짜
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

// 프로젝트 업데이트 DTO
export class UpdateProjectDto extends ProjectBaseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @IsOptional()
  @IsBoolean()
  pin?: boolean;

  @IsOptional()
  @IsArray()
  @Type(() => FeatureDto)
  features?: (FeatureDto & {
    imageFile?: Express.Multer.File;
    imageUrl?: string;
  })[];

  @IsOptional()
  @IsArray()
  @Type(() => ChallengeDto)
  challenges?: ChallengeDto[];

  @IsOptional()
  @IsArray()
  @Type(() => ScreenshotDto)
  screenshots?: (ScreenshotDto & {
    imageFile?: Express.Multer.File;
    imageUrl?: string;
  })[];

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

// 프로젝트 조회 DTO
export class GetProjectDto extends ProjectBaseDto {
  @IsNumber()
  id: number;

  @IsArray()
  features: (FeatureDto & {
    imageUrl: string;
  })[];

  @IsArray()
  challenges: ChallengeDto[];

  @IsArray()
  @IsOptional()
  screenshots?: (ScreenshotDto & {
    imageUrl: string;
  })[];

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;
}
