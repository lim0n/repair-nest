import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';
import type { IRole } from './role.type';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly username: string;
  
  @IsOptional()
  @IsString()
  @MaxLength(90)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly password: string;
  
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly email: string;
  
  @IsOptional()
  @IsString()
  @MaxLength(90)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly phone: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly user_role: IRole;
}
