import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { User } from 'src/users/user.entity';
import { IJwt } from './jwt.interface';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
  ) {}

  readonly bcrypt = bcrypt;

  async getTokens(user: User, req: Request): Promise<IJwt> {
    const fingerPrint = req.get('user-agent');
    const payload = { 
      sub: user.id,
      roles: user.roles,
    };

    console.warn('created payload', payload);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync({...payload, fingerPrint},{
        expiresIn: '1h',
      })
    };
  }

  // async getAccessToken(user: User, req: Request) {

  // }

  // async getRefreshToken(user: User, req: Request) {
    
  // }

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

  async getAccessTokenByRefreshToken(refreshToken: string, req: Request) {
    console.warn('FIRE getAccessTokenByRefreshToken');
    console.warn(refreshToken);

    let subject;

    if (refreshToken) {
      subject = await this.jwtService.verifyAsync(refreshToken);
    }

    // throw new UnauthorizedException();
    

    if (subject) {
      console.warn('verify data', subject);
    }
  }

  async signIn(
    dto: User,
    req: Request
  ): Promise<IJwt> {
    if (!dto.username) { 
      throw new UnauthorizedException();
    }
    const candidate = await this.usersService.findUserByName(dto.username);
    const user = await this.validateUser(candidate, dto.password);
    return this.getTokens(user, req);
  }

  async signInByEmail(
    dto: User,
    req: Request
  ): Promise<IJwt> {
    if (!dto.email) { 
      throw new UnauthorizedException();
    }
    const candidate = await this.usersService.findUserByEmail(dto.email);
    const user = await this.validateUser(candidate, dto.password);
    return this.getTokens(user, req);
  }

  async signInByPhone(
    dto: User,
    req: Request
  ): Promise<IJwt> {
    if (!dto.phone) { 
      throw new UnauthorizedException();
    }
    const candidate = await this.usersService.findUserByPhone(dto.phone);
    const user = await this.validateUser(candidate, dto.password);
    return this.getTokens(user, req);
  }
}
