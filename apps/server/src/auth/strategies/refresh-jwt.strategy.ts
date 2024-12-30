import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { UserService } from 'src/user/user.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { refreshJwtConfig } from '../configs';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    private readonly logger = new Logger();

    constructor(
        private readonly userService: UserService,
        @Inject(refreshJwtConfig.KEY) private readonly refreshgJwtconfig: ConfigType<typeof refreshJwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshgJwtconfig.secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtPayload) {
        const user = await this.userService.findOne(payload.sub);

        const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

        return { ...user, refreshToken };
    }
}
