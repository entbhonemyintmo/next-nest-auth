import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    getCurrentUser(@CurrentUser() user: User) {
        delete user.hashedRefreshToken;
        delete user.password;

        return user;
    }
}
