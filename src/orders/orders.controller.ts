import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InfoValidationPipe } from 'src/pipes/info-validation.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll( @Query('withDeleted') withDeleted ) {
    withDeleted = withDeleted || true;
    return this.ordersService.findAll(JSON.parse(withDeleted));
  }

  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.ordersService.findOrdersByUserId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Delete('hard/:id')
  hardRemove(@Param('id') id: string) {
    return this.ordersService.hardRemove(+id);
  }
}
