import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../shared/decorators';
import { Roles } from '../shared/decorators/roles.decorator';
import { PaginatedResponse } from '../shared/graphql/types/paginated-response.type';
import { GraphqlPassportAuthGuard } from '../shared/guards';
import { UserQueryArgs } from './graphql/inputs/pagination.input';
import { User } from './graphql/types/user.type';
import { UsersService } from './users.service';

const PaginatedUserResponse = PaginatedResponse(User);
// eslint-disable-next-line no-redeclare
type PaginatedUserResponse = InstanceType<typeof PaginatedUserResponse>;

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => PaginatedUserResponse)
  @Roles('admin')
  @UseGuards(new GraphqlPassportAuthGuard('ADMIN'))
  async users(@Args() queryArgs: UserQueryArgs): Promise<PaginatedUserResponse> {
    return this.usersService.getUsers(queryArgs);
  }

  @Query(() => User)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    return user;
  }
}
