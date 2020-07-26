import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../users/interfaces/user.interface';
import { ILoginResponse } from '../../shared/interfaces';
import { toUser } from '../../shared/transform';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser> {
    const user = await this.usersService.findOne(username);
    const passwordCompare = await bcrypt.compare(pass, user && user.password);
    if (passwordCompare) {
      return await user.toObject({
        transform: toUser,
      });
    }
    return null;
  }

  async login(user: IUser): Promise<ILoginResponse> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
