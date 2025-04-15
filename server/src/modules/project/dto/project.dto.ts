import {
  IsString,
  IsDateString,
  IsArray,
  IsOptional,
  IsUUID,
  ValidateNested,
  IsObject,
  IsBoolean,
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
  description?: string;
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
  periodStart: string;

  @IsDateString()
  periodEnd: string;

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
  periodStart?: string;

  @IsDateString()
  @IsOptional()
  periodEnd?: string;

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

  @IsBoolean()
  @IsOptional()
  pin?: boolean;
}

// 조회용 DTO (응답에 사용)
export class ProjectResponseDto {
  id: string;
  title: string;
  description: string;
  role: string;
  periodStart: string;
  periodEnd: string;
  stack: string[];
  features: FeatureDto[];
  techChallenges: TechChallengeDto[];
  screenshots: ScreenshotDto[];
}

// 기존 서비스 호환을 위한 별칭
export class GetProjectDto extends ProjectResponseDto {}
