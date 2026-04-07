import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/user.interface';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
) {}

  async signIn(
    username: string,
    pass: string,
    request: Request
  ): Promise<{'access_token', 'refresh_token'}> {
    const user = await this.usersService.findUserByName(username);
    const clientFingerprint = request.headers['user-agent'];
    
    let isMatch;

    if (user?.password) {
      isMatch = await bcrypt.compare(pass, user.password);
    } else if (user?.password === null && pass === '') {
      isMatch = true
    }

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { 
      sub: user.id,
      role: user.user_role
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync({...payload, clientFingerprint}, { expiresIn: '7d' })
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
