import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Logger
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AppController.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: User, @Request() req) {
    return this.authService.signIn(signInDto, req);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return this.authService.getProfile(req) 
  }

  @Post('refresh-access-token')
  refreshTokens(@Body() data, @Request() req) {
    return this.authService.getAccessTokenByRefreshToken(data.refreshToken, req);
  }

  @Get('debug-env')
  displayEnv() {
    // 1. Get a specific variable
    const dbUser = this.configService.get<string>('DB_USERNAME');
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const jwtAccessTokenExpires = this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES');

    
    // 2. Print it to the terminal console
    this.logger.log(`Database User: ${dbUser}`);
    this.logger.log(`jwtSecret: ${jwtSecret}`);
    this.logger.log(`jwtAccessTokenExpires: ${jwtAccessTokenExpires}`);

    // 3. Return it in an API response
    return {
      port: this.configService.get<number>('DB_PORT'),
      user: dbUser,
      jwtSecret,
      jwtAccessTokenExpires
    };
  }
}
