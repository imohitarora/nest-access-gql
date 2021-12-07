import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type * as Mail from 'nodemailer/lib/mailer';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ApiConfigService) {
    this.nodemailerTransport = nodemailer.createTransport({
      host: this.configService.emailConfig.host,
      port: this.configService.emailConfig.port,
      secure: this.configService.emailConfig.secure, // true for 465, false for other ports
      auth: {
        user: this.configService.emailConfig.user,
        pass: this.configService.emailConfig.pass,
      },
    });
  }

  async sendEmail(options: Mail.Options): Promise<boolean> {
    const info = await this.nodemailerTransport.sendMail(options);
    console.info('Message sent: %s', info.messageId);

    return Boolean(info);
  }

  sendForgotPasswordEmail(email: string, token: string): Promise<boolean> {
    return this.sendEmail({
      from: '"Company" <' + this.configService.emailConfig.from + '>',
      to: email, // list of receivers (separated by ,)
      subject: 'Forgot Password Email',
      text: 'Forgot Password Email',
      html:
        'Hi! <br><br> Thanks you, you want to reset password <br><br>' +
        '<a href=http://localhost:' +
        this.configService.appConfig.port +
        '/api/auth/reset-password/?token=' +
        token +
        '>Click here to reset password</a>', // html body
    });
  }

  async sendVerificationLinkEmail(email: string, token: string): Promise<boolean> {
    const hasInfo = await this.sendEmail({
      from: '"Company" <' + this.configService.emailConfig.from + '>',
      to: email, // list of receivers (separated by ,)
      subject: 'Verify Email',
      text: 'Verify Email',
      html:
        'Hi! <br><br> Thanks for your registration<br><br>' +
        '<a href=http://localhost:' +
        this.configService.appConfig.port +
        '/api/auth/confirm-email/?token=' +
        token +
        '>Click here to activate your account</a>', // html body
    });

    return Boolean(hasInfo);
  }
}
