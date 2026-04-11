import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { Role } from 'src/roles/roles.entity';
import { UserRoles } from 'src/roles/user-roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => AuthModule) // защита от циклических зависимостей
  ],
  providers: [
    UsersService,
    RolesService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  controllers: [UsersController],
  exports: [ UsersService ]
})
export class UsersModule {}
