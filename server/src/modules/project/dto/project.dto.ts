import { IsString, IsArray, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsUrl()
  @IsNotEmpty()
  githubUrl: string;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  technologies: string[];

  @IsArray()
  @IsNotEmpty()
  features: {
    title?: string | null;
    description?: string | null;
    imageUrl: string;
    imageAlt: string;
  }[];

  @IsArray()
  @IsNotEmpty()
  challenges: {
    number: number;
    title: string;
    description: string;
  }[];
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsString()
  @IsOptional()
  period?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @IsArray()
  @IsOptional()
  features?: {
    title?: string | null;
    description?: string | null;
    imageUrl: string;
    imageAlt: string;
  }[];

  @IsArray()
  @IsOptional()
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