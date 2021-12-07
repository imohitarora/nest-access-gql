import { Global, Module } from '@nestjs/common';

import { ApiConfigService } from './services/api-config.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';

@Global()
@Module({
  providers: [EmailService, SmsService, ApiConfigService],
  imports: [],
  exports: [EmailService, SmsService, ApiConfigService],
})
export class SharedModule {}
