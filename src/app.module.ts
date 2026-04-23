import { Module } from '@nestjs/common';
import { RepairRequestModule } from './repair-request/repair-request.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsModule } from './order_details/order_details.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AgreementsModule } from './agreements/agreements.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    RepairRequestModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    OrderDetailsModule,
    RolesModule,
    RefreshTokenModule,
    AgreementsModule
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
