import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<Pick<IUser, 'access_token' | 'user_role'>> {
    const user = await this.usersService.findUserByName(username);
    let isMatch;

    if (user?.password) {
      isMatch = await bcrypt.compare(pass, user.password);
    } else if (user?.password === null && pass === '') {
      isMatch = true
    }

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_role: user.user_role
    };
  }

  async signInByEmail(
    email: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async signInByPhone(
    phone: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByPhone(phone);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
