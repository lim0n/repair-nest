import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailsDto } from './dto/create-order_details.dto';
import { UpdateOrderDetailsDto } from './dto/update-order_details.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { OwnerOfOrderGuard } from 'src/orders/owner-of-order.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { OwnerOfOrderOfOrderDetailsGuard } from './owner-of-order-details.guard';
import { MatchDtoOrderIdToUserGuard } from './match-dto-order_id-user.guard';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @UseGuards(AuthGuard, MatchDtoOrderIdToUserGuard)
  create(@Body() createOrderDetailsDto: CreateOrderDetailsDto) {
    return this.orderDetailsService.create(createOrderDetailsDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  findAll( @Query('withDeleted') withDeleted ) {
    withDeleted = withDeleted || true;
    return this.orderDetailsService.findAll(JSON.parse(withDeleted));
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  @Get('order/:id')
  @UseGuards(AuthGuard, OwnerOfOrderGuard)
  findByOrderId(@Param('id') id: string) {
    return this.orderDetailsService.findDetailsByOrderId(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, OwnerOfOrderOfOrderDetailsGuard)
  update(@Param('id') id: string, @Body() updateOrderDetailsDto: UpdateOrderDetailsDto) {
    return this.orderDetailsService.update(+id, updateOrderDetailsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OwnerOfOrderOfOrderDetailsGuard)
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }

  @Delete('hard/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  hardRemove(@Param('id') id: string) {
    return this.orderDetailsService.hardRemove(+id);
  }
}
