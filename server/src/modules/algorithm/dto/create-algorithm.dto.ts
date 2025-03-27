import { IsString, IsArray, IsEnum, IsNotEmpty } from 'class-validator';

enum DifficultyLevel {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export class CreateAlgorithmDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficulty: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  solution: string;
} 