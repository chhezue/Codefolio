import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendContactMail({
    email,
    message,
  }: {
    email: string;
    message: string;
  }) {
    await this.mailerService.sendMail({
      to: process.env.MAIL_TO,
      subject: `[Codefolio] 연락이 왔어요!`,
      html: `
        <h3>📧 이메일: ${email}</h3>
        <p>💬 문의 내용:</p>
        <pre>${message}</pre>
      `,
    });
  }
}