import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from '@mail/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER, // 보내는 사람 이메일
          pass: process.env.MAIL_PASS, // 앱 비밀번호
        },
      },
      defaults: {
        from: `"Codefolio" <${process.env.MAIL_USER}>`
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}