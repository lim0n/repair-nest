import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  Request,
  UseGuards
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InfoValidationPipe } from 'src/pipes/info-validation.pipe';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { OwnerGuard } from 'src/auth/owner.guard';
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

  @UseGuards(AuthGuard, OwnerGuard)
  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.ordersService.findOrdersByUserId(+id);
  }

  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('hard/:id')
  hardRemove(@Param('id') id: string) {
    return this.ordersService.hardRemove(+id);
  }
}
