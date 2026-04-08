import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'backend',
    password: process.env.DB_PASSWORD || 'backend',
    database: process.env.DB_NAME || 'backend',
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNC ? process.env.DB_SYNC === 'true' : true
  }),
);