import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { OwnerOfOrderGuard } from './owner-of-order.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(createOrderDto, req);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  findAll( @Query('withDeleted') withDeleted ) {
    return this.ordersService.findAll(JSON.parse(withDeleted));
  }

  @Get('user/:id')
  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  findByUserId(@Param('id') id: string) {
    return this.ordersService.findOrdersByUserId(+id);
  }

  @Get(':id')
  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Delete('hard/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  hardRemove(@Param('id') id: string) {
    return this.ordersService.hardRemove(+id);
  }
}
