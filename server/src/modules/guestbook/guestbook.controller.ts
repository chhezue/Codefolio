import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { GuestbookService } from '@guestbook/guestbook.service';
import { CreateGuestbookDto } from '@guestbook/dto/create-guestbook.dto';
import { UpdateGuestbookDto } from '@guestbook/dto/update-guestbook.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestBookService: GuestbookService) {}

  // GET /guestbook
  @Get('/')
  getAllGuestBooks() {
    return this.guestBookService.getAllGuestBooks();
  }

  // POST /guestbook
  @Post('/')
  createGuestBook(@Body() createGuestBookDto: CreateGuestbookDto) {
    return this.guestBookService.createGuestBook(createGuestBookDto);
  }

  // PATCH /guestbook/:id
  @Patch('/:id')
  updateGuestBook(@Param('id') id: string, @Body() updateGuestBookDto: UpdateGuestbookDto) {
    return this.guestBookService.updateGuestBook(id, updateGuestBookDto);
  }

  // DELETE /guestbook/:id
  @Delete('/:id')
  deleteGuestBook(@Param('id') id: string, @Body('password') password: string) {
    return this.guestBookService.deleteGuestBook(id, password);
  }
}
