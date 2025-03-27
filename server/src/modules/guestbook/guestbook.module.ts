import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestbookController } from './guestbook.controller';
import { GuestbookService } from './guestbook.service';
import { GuestBook, GuestbookSchema } from './guestbook.schema';
import { GuestbookRepository } from './guestbook.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuestBook.name, schema: GuestbookSchema },
    ]),
  ],
  controllers: [GuestbookController],
  providers: [GuestbookService, GuestbookRepository],
  exports: [GuestbookService],
})
export class GuestbookModule {}
