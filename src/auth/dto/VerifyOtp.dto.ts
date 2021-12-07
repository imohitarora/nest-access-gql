import { IsPhoneNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  readonly otpCode: string;

  @IsString()
  @IsPhoneNumber(null)
  readonly phone: string;
}
