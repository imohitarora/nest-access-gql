import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { EmailService } from '../shared/services/email.service';
import { UserSchema } from '../users/schemas/user.schema';
import { AuthController } from './auth.controller';
import { authConfig } from './auth-config.development';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('Auth Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    const mockAuthService = {
      login: jest.fn(),
      forgotPassword: jest.fn(),
      register: jest.fn(),
      resetPassword: jest.fn(),
      confirmEmail: jest.fn(),
      resendConfirmationLinkEmail: jest.fn(),
    };
    const mockUserService = {
      login: jest.fn(),
      forgotPassword: jest.fn(),
      register: jest.fn(),
      resetPassword: jest.fn(),
      confirmEmail: jest.fn(),
      resendConfirmationLinkEmail: jest.fn(),
    };

    module = await Test.createTestingModule({
      imports: [
        // ConfigModule,
        // JwtModule.register({
        //   //imports: [ConfigModule], // Missing this
        //   // useFactory: async (configService: ApiConfigService) => ({
        //   //   signOptions: {
        //   //      expiresIn: { expiresIn: '7d' },
        //   //   },
        //   //   secretOrPrivateKey: authConfig.jwtSecretKey,
        //   // }),
        //   // inject: [ConfigModule]
        //   secret: authConfig.jwtSecretKey,
        //   signOptions: { expiresIn: '7d' },
        // }),
        // PassportModule.register({
        //   defaultStrategy: 'jwt',
        //   property: 'user',
        //   session: false,
        // }),
        // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AuthController = module.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });
});
