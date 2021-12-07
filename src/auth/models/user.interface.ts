import type { Document } from 'mongoose';

import type { Provider } from './provider.interface';

export interface User extends Document {
  readonly userId?: string;
  readonly email: { type: string; lowercase: true };
  readonly displayName: string;
  readonly picture?: string;
  readonly provider?: string;
  readonly providers?: Provider[];
  readonly roles: string[];
  readonly username?: string;
  password?: string;
  readonly facebook?: string;
  readonly github?: string;
  readonly google?: string;
  readonly linkedin?: string;
  readonly live?: string;
  readonly microsoft?: string;
  readonly twitter?: string;
  readonly windowslive?: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  verifyEmailToken?: string | null;
  verifyEmailExpires?: Date | null;
  isEmailConfirmed?: boolean;
  otpCode: string | null;
  otpCodeExpires?: Date;
  phone?: string;
}
