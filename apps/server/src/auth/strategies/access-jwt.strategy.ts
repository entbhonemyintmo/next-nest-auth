import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { UserService } from 'src/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { accessJwtConfig } from '../configs';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
    constructor(
        private readonly userService: UserService,
        @Inject(accessJwtConfig.KEY) private readonly accessJwtconfig: ConfigType<typeof accessJwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: accessJwtconfig.secret,
            ignoreExpiration: false,
        });
    }

    validate(payload: JwtPayload) {
        return this.userService.findOne(payload.sub);
    }
}
