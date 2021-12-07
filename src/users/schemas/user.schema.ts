import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import type { User } from '../../auth/models';

export const ProviderSchema = new Schema({
  providerId: String,
  name: String,
});

export const UserSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: String, unique: true },
    password: String,
    email: { type: String, lowercase: true, unique: true },
    displayName: String,
    provider: String,
    providers: [ProviderSchema],
    roles: [String],
    picture: String,
    facebook: String,
    foursquare: String,
    google: String,
    github: String,
    linkedin: String,
    live: String,
    microsoft: String,
    twitter: String,
    windowslive: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verifyEmailToken: String,
    verifyEmailExpires: Date,
    isEmailConfirmed: Boolean,
    otpCode: String,
    otpCodeExpires: Date,
    phone: { type: String, unique: true },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line no-invalid-this
  const user = this as User;

  // only hash the password if it has been modified (or is new)
  if (user.isModified('password') && user.password !== undefined) {
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
  }

  if (user.isModified('resetPasswordToken')) {
    const resetPasswordToken = user.resetPasswordToken ? await bcrypt.hash(user.resetPasswordToken, 10) : null;
    user.resetPasswordToken = resetPasswordToken;
  }

  if (user.isModified('verifyEmailToken')) {
    const verifyEmailToken = user.verifyEmailToken ? await bcrypt.hash(user.verifyEmailToken, 10) : null;
    user.verifyEmailToken = verifyEmailToken;
  }

  if (user.isModified('otpCode')) {
    const otpCode = user.otpCode ? await bcrypt.hash(user.otpCode, 10) : null;
    user.otpCode = otpCode;
  }

  next();
});
