import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async createUser(data: UserDto): Promise<IUser> {
    const userExist = await this.userModel
      .findOne({ username: data.username })
      .exec();
    if (userExist) {
      throw new BadRequestException('User already exist');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,
    };
    const user = new this.userModel(userData);
    return await user.save();
  }

  async findOne(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
