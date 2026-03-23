import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailsDto } from './create-order_details.dto';

export class UpdateOrderDetailsDto extends PartialType(CreateOrderDetailsDto) {}