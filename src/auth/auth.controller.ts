import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/create-user.dto';
import { User } from 'src/users/user.entity';
// import { IUser } from 'src/users/user.interface';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: User, @Request() req) {
    return this.authService.signIn(signInDto, req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/by-email')
  signInByEmail(@Body() signInDto: User, @Request() req) {
    return this.authService.signInByEmail(signInDto, req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/by-phone')
  signInByPhone(@Body() signInDto: User, @Request() req) {
    return this.authService.signInByPhone(signInDto, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh-access-token')
  refreshTokens(@Body() data, @Request() req) {
    return this.authService.getAccessTokenByRefreshToken(data.refreshToken, req);
  }
}
// curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
