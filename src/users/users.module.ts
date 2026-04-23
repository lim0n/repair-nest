import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { Role } from 'src/roles/roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { AuthModule } from 'src/auth/auth.module';
import { AgreementsService } from 'src/agreements/agreements.service';
import { Agreement } from 'src/agreements/entities/agreement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Agreement]),
    forwardRef(() => AuthModule) // защита от циклических зависимостей
  ],
  providers: [
    UsersService,
    RolesService,
    AgreementsService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  controllers: [UsersController],
  exports: [ UsersService ]
})
export class UsersModule {}
