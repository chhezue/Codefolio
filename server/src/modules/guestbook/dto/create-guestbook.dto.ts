import { Type } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class CreateGuestbookDto {
  @Type(() => String)
  @IsString()
  @Matches(/^\d{4}$/, {
    message: '패스워드는 4자리 숫자여야 합니다.',
  })
  password: string; // : 값이 중간에 변경되지 않도록 보호

  @Type(() => String)
  @IsString()
  name: string;

  @Type(() => String)
  @IsString()
  message: string;
}
