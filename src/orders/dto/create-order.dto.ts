import { Transform } from 'class-transformer';
import { IsString, IsEmail, MaxLength, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  readonly user_id: number;

  @IsOptional()
  @IsEmail({},{ message: 'Ошибка в адресе электронной почты' })
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

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly order_name: string;
}
