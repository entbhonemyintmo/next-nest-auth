import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { refreshJwtConfig } from './configs';
import { ConfigType } from '@nestjs/config';
import { Tokens, UserWithTokens } from './types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private readonly refreshJwtconfig: ConfigType<typeof refreshJwtConfig>,
    ) {}

    async createUser(payload: CreateUserDto): Promise<User> {
        const user = await this.userService.findByEmail(payload.email);

        if (user) throw new ConflictException('User already exists!');

        return this.userService.create(payload);
    }

    async localSignin(email: string, password: string): Promise<UserWithTokens> {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new UnauthorizedException('Invalid credentials!');

        const isValid = await verify(user.password, password);

        if (!isValid) throw new UnauthorizedException('Invalid credentials!');

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: user.id, type: 'access' }),
            this.jwtService.signAsync({ sub: user.id, type: 'refresh' }, this.refreshJwtconfig),
        ]);

        delete user.hashedRefreshToken;
        delete user.password;

        return { ...user, accessToken, refreshToken };
    }

    async refreshAccessToken(user: UserWithTokens): Promise<Tokens> {
        const accessToken = await this.jwtService.signAsync({ sub: user.id, type: 'access' });

        return { accessToken, refreshToken: user.refreshToken };
    }
}
