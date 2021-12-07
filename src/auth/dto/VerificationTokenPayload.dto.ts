import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class VerificationTokenPayloadDto {
  readonly email: { type: string; lowercase: true };

  readonly verifyEmailToken: string;
}
