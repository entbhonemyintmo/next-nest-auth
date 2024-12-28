import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { LocalSigninDto } from './dto';
import { LocalGuard } from './guards';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    register(@Body() payload: CreateUserDto) {
        return this.authService.createUser(payload);
    }

    @Post('signin')
    // @UseGuards(LocalGuard)
    login(@Body() payload: LocalSigninDto) {
        return this.authService.validateUser(payload.email, payload.password);
    }
}
