import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { LocalSigninDto } from './dto';
import { Public } from '@decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    register(@Body() payload: CreateUserDto) {
        return this.authService.createUser(payload);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    login(@Body() payload: LocalSigninDto) {
        return this.authService.localSignin(payload.email, payload.password);
    }
}
