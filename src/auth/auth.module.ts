import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { SharedModule } from '../shared/shared.module';
import { UserSchema } from '../users/schemas/user.schema';
import { AuthController } from './auth.controller';
import { authConfig } from './auth-config.development';
import { AuthService } from './services/auth.service';
import { FacebookService } from './services/facebook.service';
import { UserService } from './services/user.service';
import { WindowsliveService } from './services/windowslive.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LinkedInStrategy } from './strategies/linkedin.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { WindowsliveStrategy } from './strategies/windowslive.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: authConfig.jwtSecretKey,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    FacebookStrategy,
    FacebookService,
    GithubStrategy,
    GoogleStrategy,
    JwtStrategy,
    LocalStrategy,
    LinkedInStrategy,
    MicrosoftStrategy,
    TwitterStrategy,
    UserService,
    WindowsliveStrategy,
    WindowsliveService,
  ],
  exports: [AuthService, UserService, WindowsliveService],
})
export class AuthModule {}
