import { IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGuestbookDto {
  @Type(() => String)
  @IsString()
  @Matches(/^\d{4}$/, {
    message: '패스워드는 4자리 숫자여야 합니다.',
  })
  password: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  name?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  message?: string;
} 