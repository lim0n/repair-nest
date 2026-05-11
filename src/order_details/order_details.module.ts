import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { OrderDetailsController } from './order_details.controller';
import { OrderDetailsService } from './order_details.service';
import { OrderDetails } from './entities/order_details.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { OrdersModule } from 'src/orders/orders.module';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    forwardRef(() => OrdersModule),
    TypeOrmModule.forFeature([OrderDetails, Order]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    OrderDetailsService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  controllers: [OrderDetailsController],
  exports: [OrderDetailsService]
})
export class OrderDetailsModule {}
