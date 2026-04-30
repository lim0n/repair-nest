import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    RefreshTokenModule,
    TypeOrmModule.forFeature([User]),
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
