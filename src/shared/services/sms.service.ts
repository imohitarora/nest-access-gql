import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ApiConfigService) {
    this.twilioClient = new Twilio(this.configService.smsConfig.accountSid, this.configService.smsConfig.authToken);
  }

  async sendOtpCodeSms(phone: string, otpCode: string): Promise<boolean> {
    const info = await this.twilioClient.messages.create({
      body: `Hello from GolfAI, your OTP code is ${otpCode}`,
      from: this.configService.smsConfig.phoneFrom,
      to: phone,
    });
    console.log('Sent Otp code result:', info);

    return info && info.errorCode === null;
  }
}
