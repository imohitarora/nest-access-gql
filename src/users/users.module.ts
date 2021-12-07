import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';
import { UserSchema } from './schemas/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersResolver, UsersService, GraphqlPassportAuthGuard],
})
export class UsersModule {}
