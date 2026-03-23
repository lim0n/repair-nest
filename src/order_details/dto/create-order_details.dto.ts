import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateOrderDetailsDto {
  @IsNumber()
  order_id: number;

  @IsOptional()
  @IsString()
  details: string;

  @IsNumber()
  author: number;

  @IsOptional()
  hidden: boolean;
}