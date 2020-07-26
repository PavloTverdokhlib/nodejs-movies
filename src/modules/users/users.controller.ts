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
  async createMovie(@Body() data: UserDto): Promise<IUser> {
    const newUser = await this.userService.createUser(data);
    const updated = await newUser.toObject({
      transform: toUser,
    });
    return updated;
  }
}
