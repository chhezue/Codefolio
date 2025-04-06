import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from '@mail/mail.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async handleContact(@Body() body: { email: string; phone: string; message: string }) {
    await this.mailService.sendContactMail(body);
    return { success: true };
  }
}