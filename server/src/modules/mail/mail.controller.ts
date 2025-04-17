import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "@mail/mail.service";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async handleContact(@Body() body: { email: string; message: string }) {
    await this.mailService.sendContactMail(body);
    return { success: true };
  }
}
