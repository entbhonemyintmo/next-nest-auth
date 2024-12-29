import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const accessJwtConfig = registerAs(
    'access-jwt',
    (): JwtModuleOptions => ({
        secret: process.env.JWT_ACCESS_SECRET,
        signOptions: { expiresIn: '60s' },
    }),
);
