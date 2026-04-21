import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Request } from 'express';
import { User } from 'src/users/user.entity';
import { IJwt } from './jwt.interface';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { CreateRefreshTokenDto } from 'src/refresh-token/dto/create-refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private refreshTokenService: RefreshTokenService
  ) {}

  readonly bcrypt = bcrypt;

  async getTokens(user: User, req: Request): Promise<IJwt> {
    const fingerPrint = req.get('user-agent');
    const payload = { 
      sub: user.id,
      roles: user.roles,
    };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync({...payload, fingerPrint},{ expiresIn: '1h' });

    const refreshTokenDto = {
      user_id: user.id,
      refreshToken: refresh_token
    }

    this.refreshTokenService.create(refreshTokenDto);

    return {
      access_token,
      refresh_token
    };
  }

  async getAccessToken(user: User): Promise<string> {
    const payload = { 
      sub: user.id,
      roles: user.roles,
    };
    return await this.jwtService.signAsync(payload);
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

  async getAccessTokenByRefreshToken(refreshToken: string, req: Request) {
    try {
      const isValidAndDecoded = await this.jwtService.verifyAsync(refreshToken);
      const storedRefreshTokens = (await this.refreshTokenService.findByUserId(isValidAndDecoded.sub)).map(item => item.refreshToken);
      const candidate = await this.usersService.findOne(isValidAndDecoded.sub);
      if (storedRefreshTokens.includes(refreshToken)) {
        return {access_token: await this.getAccessToken(candidate)};
      }
    } catch (error) {
      throw new ForbiddenException();
    }
    throw new ForbiddenException();
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
    const tokens = await this.getTokens(user, req);
    if (user.id) {
      const newRefreshToken = {
        user_id: user.id,
        refreshToken: tokens.refresh_token
      }
      this.refreshTokenService.create(newRefreshToken);
    }
    return tokens;
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
