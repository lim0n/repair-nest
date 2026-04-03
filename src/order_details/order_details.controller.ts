import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailsDto } from './dto/create-order_details.dto';
import { UpdateOrderDetailsDto } from './dto/update-order_details.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  create(@Body() createOrderDetailsDto: CreateOrderDetailsDto) {
    return this.orderDetailsService.create(createOrderDetailsDto);
  }

  @Get()
  findAll( @Query('withDeleted') withDeleted ) {
    withDeleted = withDeleted || true;
    return this.orderDetailsService.findAll(JSON.parse(withDeleted));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  @Get('order/:id')
  findByOrderId(@Param('id') id: string) {
    return this.orderDetailsService.findDetailsByOrderId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailsDto: UpdateOrderDetailsDto) {
    return this.orderDetailsService.update(+id, updateOrderDetailsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }

  @Delete('hard/:id')
  hardRemove(@Param('id') id: string) {
    return this.orderDetailsService.hardRemove(+id);
  }
}
