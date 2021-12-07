import { IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  readonly token: string;
}
