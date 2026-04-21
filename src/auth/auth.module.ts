import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
