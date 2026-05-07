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
import { User } from 'src/users/user.entity';
import { OwnerGuard } from './owner.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: User, @Request() req) {
    return this.authService.signIn(signInDto, req);
  }

  @Get('profile')
  @UseGuards(AuthGuard, RolesGuard, OwnerGuard)
  getProfile(@Request() req) {
    return this.authService.getProfile(req) 
  }

  @Post('refresh-access-token')
  refreshTokens(@Body() data, @Request() req) {
    return this.authService.getAccessTokenByRefreshToken(data.refreshToken, req);
  }
}
