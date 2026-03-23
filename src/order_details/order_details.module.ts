import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { OrderDetailsController } from './order_details.controller';
import { OrderDetailsService } from './order_details.service';
import { OrderDetails } from './entities/order_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  providers: [
    OrderDetailsService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  controllers: [OrderDetailsController],
})
export class OrderDetailsModule {}
