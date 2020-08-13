import { Controller, Post, Body } from '@nestjs/common';
import { routes } from '../../constants';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { toUser } from '../../shared/transform';

@Controller(routes.users)
export class UsersController {
  constructor(public readonly userService: UsersService) {}

  @Post('create')
  async createUser(@Body() data: UserDto): Promise<IUser> {
    const newUser = await this.userService.createUser(data);
    return await newUser.toObject({
      transform: toUser,
    });
  }
}
