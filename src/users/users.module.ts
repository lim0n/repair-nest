import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  exports: [ UsersService ],
  controllers: [UsersController]
})
export class UsersModule {}
