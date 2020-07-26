import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { IUser } from '../users/interfaces/user.interface';
import { toUser } from '../../shared/transform';
import { routes } from '../../constants';

@Controller(routes.auth)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('sign-up')
  async signUp(@Body() data: UserDto): Promise<IUser> {
    const newUser = await this.userService.createUser(data);
    const transformedData = await newUser.toObject({
      transform: toUser,
    });
    return transformedData;
  }
}
