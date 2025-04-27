import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
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
  @IsNotEmpty()
  title: string; // 기능의 제목/이름

  @IsString()
  @IsNotEmpty()
  description: string; // 기능에 대한 상세 설명

  @IsString()
  @IsOptional()
  imageAlt?: string; // 이미지 대체 텍스트 (선택사항)

  @IsString()
  @IsOptional()
  imageUrl?: string; // 기능 관련 이미지 URL (서버에서 설정)
}

/**
 * 프로젝트 개발 중 마주친 도전 과제를 정의하는 DTO
 */
class ChallengeDto {
  @IsNumber()
  @Type(() => Number) // 문자열로 전송된 값을 숫자로 자동 변환
  number: number; // 도전 과제 번호

  @IsString()
  @IsNotEmpty()
  title: string; // 도전 과제 제목

  @IsString()
  @IsNotEmpty()
  description: string; // 도전 과제 내용 설명
}

/**
 * 프로젝트 스크린샷 정보를 정의하는 DTO
 */
class ScreenshotDto {
  @IsString()
  @IsOptional()
  imageAlt?: string; // 이미지 대체 텍스트

  @IsString()
  @IsOptional()
  description?: string; // 스크린샷에 대한 설명 (선택사항)

  @IsString()
  @IsOptional()
  imageUrl?: string; // 스크린샷 이미지 URL (서버에서 설정)
}

/**
 * 프로젝트 생성 시 사용되는 DTO
 */
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string; // 프로젝트 제목

  @IsString()
  @IsNotEmpty()
  summary: string; // 프로젝트 요약 설명

  @IsString()
  @IsNotEmpty()
  githubUrl: string; // GitHub URL

  @IsString()
  @IsNotEmpty()
  startDate: string; // 프로젝트 시작 날짜

  @IsString()
  @IsOptional()
  endDate?: string; // 프로젝트 종료 날짜 (선택사항)

  @IsString()
  @IsOptional()
  period?: string; // 형식화된 기간

  @IsString()
  @IsNotEmpty()
  role: string; // 프로젝트에서 맡은 역할

  @IsArray()
  @IsString({ each: true })
  technologies: string[]; // 사용된 기술 스택

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  features: FeatureDto[]; // 프로젝트의 주요 기능들

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChallengeDto)
  challenges: ChallengeDto[]; // 도전 과제와 해결 과정

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  screenshots: ScreenshotDto[]; // 프로젝트 스크린샷

  @IsString()
  @IsOptional()
  pin?: string; // 프로젝트 고정 여부 (문자열로 'true' 또는 'false')
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
  summary?: string; // 프로젝트 요약 (선택적)

  @IsString()
  @IsOptional()
  githubUrl?: string; // GitHub URL (선택적)

  @IsString()
  @IsOptional()
  startDate?: string; // 시작 날짜 (선택적)

  @IsString()
  @IsOptional()
  endDate?: string; // 종료 날짜 (선택적)

  @IsString()
  @IsOptional()
  period?: string; // 형식화된 기간 (선택적)

  @IsString()
  @IsOptional()
  role?: string; // 맡은 역할 (선택적)

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[]; // 기술 스택 (선택적)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  @IsOptional()
  features?: FeatureDto[]; // 주요 기능 (선택적)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChallengeDto)
  @IsOptional()
  challenges?: ChallengeDto[]; // 도전 과제 (선택적)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreenshotDto)
  @IsOptional()
  screenshots?: ScreenshotDto[]; // 스크린샷 (선택적)

  @IsString()
  @IsOptional()
  pin?: string; // 고정 여부 (선택적, 문자열로 'true' 또는 'false')
}
