import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { OrderDetails } from 'src/order_details/entities/order_details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetails])
  ],
  providers: [
    OrdersService,
    OrderDetailsService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
