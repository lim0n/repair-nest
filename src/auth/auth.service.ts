import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
  ) {}

  readonly bcrypt = bcrypt;

  async getTokens(user: User): Promise<{'access_token', 'refresh_token'}> {
    const payload = { 
      sub: user.id,
      roles: user.roles
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload)
    };
  }

  private async validateUser(user: User, password?: string): Promise<User> {
    let isMatch;

    if (user.password && password) {
      isMatch = await this.bcrypt.compare(password, user.password);
    } else if (user?.password === null && password === undefined) { // когда приходим сюда из создания ззаказа
      isMatch = true
    }

    if (isMatch) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async signIn(
    dto: User,
  ): Promise<{'access_token', 'refresh_token'}> {
    if (!dto.username) { 
      throw new UnauthorizedException();
    }
    const candidate = await this.usersService.findUserByName(dto.username);
    const user = await this.validateUser(candidate, dto.password);
    return this.getTokens(user);
  }

  async signInByEmail(
    dto: User,
  ): Promise<{'access_token', 'refresh_token'}> {
    if (!dto.email) { 
      throw new UnauthorizedException();
    }
    const candidate = await this.usersService.findUserByEmail(dto.email);
    const user = await this.validateUser(candidate, dto.password);
    return this.getTokens(user);
  }

  async signInByPhone(
    dto: User
  ): Promise<{'access_token', 'refresh_token'}> {
    if (!dto.phone) { 
      throw new UnauthorizedException();
    }
    const candidate = await this.usersService.findUserByPhone(dto.phone);
    const user = await this.validateUser(candidate, dto.password);
    return this.getTokens(user);
  }
}
