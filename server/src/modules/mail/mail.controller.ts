import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from '@mail/mail.service';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('연락')
@Controller('contact')
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: '연락 메시지 전송' })
  @ApiBody({
    description: '연락 폼 데이터',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        message: { type: 'string', example: '문의 내용입니다.' }
      },
      required: ['email', 'message']
    }
  })
  @Post()
  async handleContact(@Body() body: { email: string; message: string }) {
    await this.mailService.sendContactMail(body);
    return { success: true };
  }
}