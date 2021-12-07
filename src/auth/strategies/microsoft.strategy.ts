import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-microsoft';

import { authConfig } from '../auth-config.development';
import { AuthService, Provider } from '../services/auth.service';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: authConfig.providers.microsoft.clientID,
      clientSecret: authConfig.providers.microsoft.clientSecret,
      callbackURL: authConfig.providers.microsoft.callbackURL,
      passReqToCallback: true,
      scope: ['user.read'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      Logger.log('Microsoft UserProfile', 'Auth');
      const jsonProfile = (profile && profile._json) || {};

      const userProfile = {
        userId: jsonProfile.id,
        microsoft: jsonProfile.id,
        username: jsonProfile.userName,
        email: jsonProfile.userPrincipalName,
        displayName: profile.displayName,
        picture: null, // profile.photos[0].value, <-- no longer valid, we now have to use MS Graph API
      };

      // console.log('userProfile::', profile)
      const oauthResponse = await this.authService.validateOAuthLogin(userProfile, Provider.MICROSOFT);
      done(null, {
        ...JSON.parse(JSON.stringify(oauthResponse.user)),
        jwt: oauthResponse.jwt,
      });
    } catch (error) {
      done(error, false);
    }
  }
}
