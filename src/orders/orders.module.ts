import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from 'src/filters/typeorm-exception.filter';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { OrderDetails } from 'src/order_details/entities/order_details.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { RolesModule } from 'src/roles/roles.module';
import { OrderDetailsModule } from 'src/order_details/order_details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetails]),
    UsersModule,
    forwardRef(() => OrderDetailsModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    AuthModule,
    RolesModule
  ],
  providers: [
    OrdersService,
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
  controllers: [OrdersController],
  exports: [OrdersService]
})
export class OrdersModule {}
