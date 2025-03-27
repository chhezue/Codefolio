import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GuestBook } from '@guestbook/guestbook.schema';
import { Model } from 'mongoose';
import { CreateGuestbookDto } from '@guestbook/dto/create-guestbook.dto';

@Injectable()
export class GuestbookRepository {
  constructor(@InjectModel(GuestBook.name) private readonly guestBookModel: Model<GuestBook>) {}

  findAll() {
    return this.guestBookModel.find({}).exec();
  }

  findById(id: string) {
    return this.guestBookModel.findById(id).exec();
  }

  create(createGuestBookDto: CreateGuestbookDto) {
    return this.guestBookModel.create(createGuestBookDto);
  }

  delete(id: string) {
    return this.guestBookModel.findByIdAndDelete(id);
  }
  
  update(id: string, updateData: any) {
    return this.guestBookModel.findByIdAndUpdate(id, updateData, { new: true });
  }
}
