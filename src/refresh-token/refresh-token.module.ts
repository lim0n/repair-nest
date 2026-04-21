import { forwardRef, Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenController } from './refresh-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
