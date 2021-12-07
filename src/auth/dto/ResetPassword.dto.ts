import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, isPhoneNumber, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ example: 'golfai@yopmail.com', description: "User's Email", type: () => 'string' })
  readonly email?: { type: string; lowercase: true };

  @IsPhoneNumber(null)
  @IsOptional()
  @ApiPropertyOptional({ example: '+840123456789', description: "User's Phone", type: () => 'string' })
  readonly phone?: string;

  @IsString()
  @MinLength(5)
  @ApiProperty({ description: "User's Password (only applies when using username/password)", type: () => 'string' })
  readonly newPassword: string;

  @IsString()
  @ApiProperty({ description: 'Reset password token', type: () => 'string' })
  readonly resetPasswordToken: string;
}
