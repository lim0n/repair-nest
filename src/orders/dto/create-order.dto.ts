import { Transform } from 'class-transformer';
import { IsString, IsEmail, MaxLength, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly user_id: number;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly email: string;

  @IsOptional()
  @IsString()
  @MaxLength(90)
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly phone: string;
}
