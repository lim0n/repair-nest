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
  signIn(@Body() signInDto: User) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/by-email')
  signInByEmail(@Body() signInDto: User) {
    return this.authService.signInByEmail(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/by-phone')
  signInByPhone(@Body() signInDto: User) {
    return this.authService.signInByPhone(signInDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
// curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
