import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { DelayMiddleware } from './middleware/delay/delay.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot(databaseConfig()),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USERNAME'),
    //     password: configService.get<string>('DB_PASSWORD'),
    //     database: configService.get<string>('DB_NAME'),
    //     autoLoadEntities: true,
    //     synchronize: true, // Turn off in production!
    //   }),
    // }),

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
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(DelayMiddleware)
//       .forRoutes('{*splat}');
//   }
// }
