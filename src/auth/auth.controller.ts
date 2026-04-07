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
// import { IUser } from 'src/users/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: Record<string, any>,
    @Request() request
  ): Promise<{'access_token', 'refresh_token'}> {
    return this.authService.signIn(signInDto.username, signInDto.password, request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/by-email')
  signInByEmail(@Body() signInDto: Record<string, any>) {
    return this.authService.signInByEmail(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/by-phone')
  signInByPhone(@Body() signInDto: Record<string, any>) {
    return this.authService.signInByPhone(signInDto.phone, signInDto.password);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
// curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
