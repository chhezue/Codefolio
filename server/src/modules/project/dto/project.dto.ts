import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

// 특화된 DTO 타입들을 위한 중첩 클래스
class FeatureDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}

class TechChallengeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

class ScreenshotDto {
  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  description: string;
}

class DocumentDto {
  @IsString()
  type: "GITHUB" | "DOC" | "STATS";

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  link: string;
}

// 기본 프로젝트 DTO (생성용)
export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  role: string;

  @IsDateString()
  periodStart: Date;

  @IsDateString()
  periodEnd: Date;

  @IsArray()
  @IsString({ each: true })
  stack: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  features: FeatureDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechChallengeDto)
  techChallenges: TechChallengeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  screenshots: ScreenshotDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];

  @IsBoolean()
  @IsOptional()
  pin?: boolean;
}

// 업데이트용 DTO - 모든 필드가 선택적
export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsDateString()
  @IsOptional()
  periodStart?: Date;

  @IsDateString()
  @IsOptional()
  periodEnd?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  stack?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  @IsOptional()
  features?: FeatureDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechChallengeDto)
  @IsOptional()
  techChallenges?: TechChallengeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  @IsOptional()
  screenshots?: ScreenshotDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  @IsOptional()
  documents?: DocumentDto[];

  @IsBoolean()
  @IsOptional()
  pin?: boolean;
}

// 조회용 DTO (응답에 사용)
export class GetProjectDto {
  id: string; // 프로젝트 고유 ID
  title: string; // 프로젝트 제목
  description: string; // 프로젝트 설명
  role: string; // 맡은 역할
  periodStart: Date; // 시작 기간
  periodEnd: Date; // 종료 기간
  stack: string[]; // 사용 기술 스택
  features: FeatureDto[]; // 주요 기능
  techChallenges: TechChallengeDto[]; // 기술적 도전과 해결 과정
  screenshots: ScreenshotDto[]; // 실제 구현 화면 (최대 3개)
  documents: DocumentDto[]; // 프로젝트 문서 (GitHub, 기술 문서, 통계 등)
  pin: boolean; // 고정 여부
  createdAt: Date; // 생성 시간
  updatedAt: Date; // 업데이트 시간
}
