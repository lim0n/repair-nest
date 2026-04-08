import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { Role } from 'src/roles/roles.entity';
import { UserRoles } from 'src/roles/user-roles.entity';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
    // TypeOrmModule.forFeature([UserRoles])
  ],
  providers: [
    UsersService,
    RolesService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  exports: [ UsersService ],
  controllers: [UsersController]
})
export class UsersModule {}
