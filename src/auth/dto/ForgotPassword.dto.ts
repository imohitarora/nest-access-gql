import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ example: 'golfai@yopmail.com', description: "User's Email", type: () => 'string' })
  readonly email?: { type: string; lowercase: true };

  @IsPhoneNumber(null)
  @IsOptional()
  @ApiPropertyOptional({ example: '+841234567890', description: "User's phone", type: () => 'string' })
  readonly phone?: string;
}
