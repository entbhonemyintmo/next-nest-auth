import { Body, Controller, HttpCode, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { LocalSigninDto } from './dto';
import { Public } from '@decorators/public.decorator';
import { RefreshJwtGuard } from './guards';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UserWithTokens } from './types';

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

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RefreshJwtGuard)
    refresh(@CurrentUser() user: UserWithTokens) {
        return this.authService.refreshAccessToken(user);
    }
}
