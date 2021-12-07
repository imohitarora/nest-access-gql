import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';

import { getFilterByQuery } from '../shared/graphql/utils/utilities';
import type { UserQueryArgs } from './graphql/inputs/pagination.input';
import type { User } from './models/user.interface';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  stringToBase64 = (data: string): string => Buffer.from(data).toString('base64');

  base64ToString = (data: string): string => Buffer.from(data, 'base64').toString('ascii');

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUsers(userQueryArgs: UserQueryArgs): Promise<{
    totalCount: number;
    nodes: User[];
    pageInfo?: { hasNextPage: boolean; endCursor?: string };
  }> {
    const { first, offset, filterBy, orderBy, cursor } = userQueryArgs;

    const findQuery = filterBy ? getFilterByQuery(filterBy) : ({} as any);

    if (cursor) {
      findQuery._id = {
        $lt: this.base64ToString(cursor),
        // $lt: (cursor)
      };
    }

    let schema = this.userModel.find({ ...findQuery });

    if (Array.isArray(orderBy)) {
      const sort: string[][] = [];

      for (const sorter of orderBy) {
        sort.push([sorter.field, sorter.direction]);
      } // [['name', 'asc']]

      schema = schema.sort(sort);
    }

    const query = schema.toConstructor();
    const totalCount = await schema.countDocuments().exec();
    let nodes = await new query()
      .skip(offset)
      .limit(first + 1)
      .exec(); // add +1 to check if we have next page
    // let nodes = await query().limit(first + 1).exec(); // with cursor
    const hasNextPage = nodes.length > first;

    if (hasNextPage) {
      nodes = nodes.slice(0, -1); // remove unnecessary extra item pulled for hasNextPage check
    }

    return {
      totalCount,
      nodes,
      pageInfo: {
        hasNextPage,
        endCursor: hasNextPage ? this.stringToBase64(nodes[nodes.length - 1].id) : undefined,
      },
    };
  }

  async getTotalUserCount(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }
}
