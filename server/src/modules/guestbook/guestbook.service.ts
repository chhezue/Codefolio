import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GuestbookRepository } from '@guestbook/guestbook.repository';
import { GetGuestbookDto } from '@guestbook/dto/get-guestbook.dto';
import { CreateGuestbookDto } from '@guestbook/dto/create-guestbook.dto';
import { UpdateGuestbookDto } from '@guestbook/dto/update-guestbook.dto';

@Injectable()
export class GuestbookService {
  constructor(private readonly guestBookRepository: GuestbookRepository) {}

  // _id -> id로 변환
  private transformGuestBook(guestBook: any) {
    return {
      ...guestBook.toObject(),
      id: guestBook._id.toString(),
      _id: undefined,
    };
  }

  // 모든 방명록 조회
  public async getAllGuestBooks(): Promise<GetGuestbookDto[]> {
    try {
      const guestBooks = await this.guestBookRepository.findAll();
      return guestBooks.map((guestBook) => this.transformGuestBook(guestBook));
    } catch (err) {
      throw new HttpException(
        {
          message: '방명록 조회 중 오류가 발생했습니다.',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 오류 반환
      );
    }
  }

  // 새로운 방명록 등록
  public async createGuestBook(createGuestBookDto: CreateGuestbookDto) {
    try {
      const hashedPassword = await bcrypt.hash(createGuestBookDto.password, 10); // 비밀번호 해시 처리
      const newGuestBookDto = { ...createGuestBookDto, password: hashedPassword }; // 새로운 객체 생성
      const newGuestBook = await this.guestBookRepository.create(newGuestBookDto);
      return this.transformGuestBook(newGuestBook);
    } catch (err) {
      throw new HttpException(
        {
          message: '방명록 생성 중 오류가 발생했습니다.',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 오류 반환
      );
    }
  }

  // 방명록 수정
  public async updateGuestBook(id: string, updateGuestBookDto: UpdateGuestbookDto) {
    try {
      const guestBook = await this.guestBookRepository.findById(id);
      if (!guestBook) {
        throw new HttpException(
          { message: '방명록을 찾을 수 없습니다.' },
          HttpStatus.NOT_FOUND, // 404 오류 반환
        );
      }

      // 비밀번호 확인
      const isMatch = await this.authenticatePassword(
        updateGuestBookDto.password,
        guestBook.password
      );

      if (!isMatch) {
        throw new HttpException(
          { message: '비밀번호가 일치하지 않습니다.' },
          HttpStatus.UNAUTHORIZED, // 401 오류 반환
        );
      }

      // 수정할 데이터에서 비밀번호 제외
      const { password, ...updateData } = updateGuestBookDto;
      
      // 방명록 업데이트
      const updatedGuestBook = await this.guestBookRepository.update(id, updateData);
      return this.transformGuestBook(updatedGuestBook);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err; // 이미 HttpException인 경우 그대로 전달
      }
      throw new HttpException(
        {
          message: '방명록 수정 중 오류가 발생했습니다.',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 오류 반환
      );
    }
  }

  // 방명록 삭제
  public async deleteGuestBook(id: string, password: string) {
    try {
      const guestBook = await this.guestBookRepository.findById(id); // 방명록 조회
      if (!guestBook) {
        throw new HttpException(
          { message: '방명록을 찾을 수 없습니다.' },
          HttpStatus.NOT_FOUND, // 404 오류 반환
        );
      }

      // 비밀번호가 제공되지 않았을 경우
      if (!password) {
        throw new HttpException(
          { message: '비밀번호를 입력해야 합니다.' },
          HttpStatus.BAD_REQUEST, // 400 오류 반환
        );
      }

      const isMatch = await this.authenticatePassword(password, guestBook.password); // 비밀번호 확인

      if (isMatch) {
        await this.guestBookRepository.delete(id); // 방명록 삭제
        return this.transformGuestBook(guestBook); // 삭제된 guestBook 반환
      } else {
        throw new HttpException(
          { message: '비밀번호가 일치하지 않습니다.' },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err; // 이미 HttpException인 경우 그대로 전달
      }
      throw new HttpException(
        {
          message: '방명록 삭제 중 오류가 발생했습니다.',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 오류 반환
      );
    }
  }

  // 비밀번호 일치 확인 메소드
  async authenticatePassword(inputPassword: string, storedPasswordHash: string) {
    try {
      // 입력된 패스워드와 저장된 패스워드 해시를 비교
      return await bcrypt.compare(inputPassword, storedPasswordHash);
    } catch (err) {
      throw new HttpException(
        {
          message: '비밀번호 인증 중 오류가 발생했습니다.',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR, // 500 오류 반환
      );
    }
  }
}
