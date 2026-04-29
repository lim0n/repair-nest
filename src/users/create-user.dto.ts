import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';
import type { IRole } from './role.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Neo', description: 'Логин'})
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly username?: string;
  
  @ApiProperty({ example: 'Matr1x', description: 'Пароль'})
  @IsOptional()
  @IsString()
  @MaxLength(90)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly password?: string;
  
  @ApiProperty({ example: 'Neo@matrix.com', description: 'Адрес электронной почты'})
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly email?: string;
  
  @ApiProperty({ example: 'Томас Андерсон', description: 'Полное имя пользователя'})
  @IsOptional()
  @IsString()
  @MaxLength(90)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly name?: string;

  @ApiProperty({ example: '+79168048533', description: 'Номер телефона'})
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly phone?: string;

  @ApiProperty({ example: 'Manager', description: 'Роль пользователя'})
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly user_role?: IRole;
}
