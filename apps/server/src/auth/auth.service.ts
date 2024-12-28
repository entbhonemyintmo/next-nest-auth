import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async createUser(payload: CreateUserDto): Promise<User> {
        const user = await this.userService.findByEmail(payload.email);

        if (user) throw new ConflictException('User already exists!');

        return this.userService.create(payload);
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new UnauthorizedException('Invalid credentials!');

        const isValid = await verify(user.password, password);

        if (!isValid) throw new UnauthorizedException('Invalid credentials!!');

        delete user.password;
        return user;
    }
}
