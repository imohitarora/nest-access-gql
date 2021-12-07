import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';

import type { User } from '../../auth/models';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class OwnersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUserId(id: string): Promise<User> {
    const owner = await this.userModel.findOne({ userId: id }).exec();

    if (!owner) {
      throw new NotFoundException("Could not find cat's owner.");
    }

    return owner;
  }
}
