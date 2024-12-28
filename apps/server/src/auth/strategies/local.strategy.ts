import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, Logger } from '@nestjs/common';
import { LocalSigninDto } from '../dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    validate(username: string, password: string) {
        this.logger.debug('Validating user: ' + username);

        return this.authService.validateUser(username, password);
    }
}
