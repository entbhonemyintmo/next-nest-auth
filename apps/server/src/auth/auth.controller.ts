import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    register(@Body() payload: CreateUserDto) {

        this.logger.log('Registering new user: ' + JSON.stringify(payload));

        return this.authService.createUser(payload);
    }
}
