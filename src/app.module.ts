import { Module } from '@nestjs/common';
import { RepairRequestModule } from './repair-request/repair-request.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsModule } from './order_details/order_details.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'backend', 
      password: 'backend', 
      database: 'backend', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    RepairRequestModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    OrderDetailsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
