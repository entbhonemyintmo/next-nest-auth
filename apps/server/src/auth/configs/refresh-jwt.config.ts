import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const refreshJwtConfig = registerAs(
    'refresh-jwt',
    (): JwtSignOptions => ({ secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1hr' }),
);
