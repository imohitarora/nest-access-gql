import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @ApiProperty({ example: 'golfai@yopmail.com', description: "User's Email", type: () => 'string' })
  readonly username: { type: string; lowercase: true };

  @IsString()
  @MinLength(5)
  @ApiProperty({
    example: 'password',
    description: "User's Password (only applies when using username/password)",
    type: () => 'string',
  })
  readonly password: string;
}
