import { User } from '@prisma/client';

export type JwtPayload = {
    sub: number;
    type: 'access' | 'refresh';
};

export type Tokens = { accessToken: string; refreshToken: string };

export type UserWithTokens = User & Tokens;
