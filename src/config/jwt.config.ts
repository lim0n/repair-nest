import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import type { StringValue } from "ms";

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    global: true,
    secret: process.env.JWT_SECRET || 'fGRgJz',
    signOptions: { 
      expiresIn: <StringValue>process.env.JWT_ACCESS_TOKEN_EXPIRES || '60s'
    },
  }),
);