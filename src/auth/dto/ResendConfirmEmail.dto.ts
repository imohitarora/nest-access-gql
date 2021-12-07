import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendConfirmEmailDto {
  @IsEmail()
  @ApiProperty({ example: 'golfai@yopmail.com', description: "User's Email", type: () => 'string' })
  readonly email: string;
}
