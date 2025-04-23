import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * 프로젝트의 중첩된 DTO 클래스들을 정의합니다.
 * 이 클래스들은 프로젝트 생성 및 업데이트 시 사용됩니다.
 */

/**
 * 프로젝트의 주요 기능을 정의하는 DTO
 */
class FeatureDto {
  @IsString()
  title: string; // 기능의 제목/이름

  @IsString()
  description: string; // 기능에 대한 상세 설명

  @IsString()
  @IsOptional()
  imageUrl?: string; // 기능 관련 이미지 URL (선택사항)
}

/**
 * 프로젝트 개발 중 마주친 기술적 도전과 해결책을 정의하는 DTO
 */
class TechChallengeDto {
  @IsString()
  title: string; // 기술적 도전의 제목

  @IsString()
  description: string; // 도전 내용과 해결 방법에 대한 설명
}

/**
 * 프로젝트 스크린샷 정보를 정의하는 DTO
 */
class ScreenshotDto {
  @IsString()
  imageUrl: string; // 스크린샷 이미지 URL

  @IsString()
  description: string; // 스크린샷에 대한 설명 (선택사항)
}

/**
 * 프로젝트 생성 시 사용되는 DTO
 * 프로젝트의 모든 필수 정보를 포함합니다.
 */
export class CreateProjectDto {
  @IsString()
  title: string; // 프로젝트 제목

  @IsString()
  description: string; // 프로젝트 상세 설명

  @IsString()
  role: string; // 프로젝트에서 맡은 역할

  @IsDateString()
  periodStart: Date; // 프로젝트 시작 날짜

  @IsDateString()
  periodEnd: Date; // 프로젝트 종료 날짜

  @IsArray()
  @IsString({ each: true })
  stack: string[]; // 사용된 기술 스택 (예: "React", "TypeScript", "Node.js")

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  @MinLength(1)
  @MaxLength(3)
  features: FeatureDto[]; // 프로젝트의 주요 기능들

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechChallengeDto)
  @MinLength(1)
  @MaxLength(3)
  techChallenges: TechChallengeDto[]; // 기술적 도전과 해결 과정

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  @MinLength(1)
  @MaxLength(3)
  screenshots: ScreenshotDto[]; // 프로젝트 스크린샷

  @IsBoolean()
  @IsOptional()
  pin?: boolean; // 프로젝트 고정 여부 (선택사항)
}

/**
 * 프로젝트 업데이트 시 사용되는 DTO
 * 모든 필드가 선택적(optional)이어서 부분 업데이트가 가능합니다.
 */
export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string; // 프로젝트 제목 (선택적)

  @IsString()
  @IsOptional()
  description?: string; // 프로젝트 설명 (선택적)

  @IsString()
  @IsOptional()
  role?: string; // 맡은 역할 (선택적)

  @IsDateString()
  @IsOptional()
  periodStart?: Date; // 시작 날짜 (선택적)

  @IsDateString()
  @IsOptional()
  periodEnd?: Date; // 종료 날짜 (선택적)

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  stack?: string[]; // 기술 스택 (선택적)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  @IsOptional()
  features?: FeatureDto[]; // 주요 기능 (선택적)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechChallengeDto)
  @IsOptional()
  techChallenges?: TechChallengeDto[]; // 기술적 도전 (선택적)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  screenshots?: ScreenshotDto[]; // 스크린샷 (선택적)

  @IsBoolean()
  @IsOptional()
  pin?: boolean; // 고정 여부 (선택적)
}

/**
 * 프로젝트 조회 결과를 위한 DTO
 * 프로젝트의 모든 정보를 포함하며 응답으로 사용됩니다.
 */
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
  pin: boolean; // 고정 여부
  createdAt: Date; // 생성 시간
  updatedAt: Date; // 업데이트 시간
}
