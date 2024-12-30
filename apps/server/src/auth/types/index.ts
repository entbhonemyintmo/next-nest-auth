export type JwtPayload = {
    sub: number;
    type: 'access' | 'refresh';
};
