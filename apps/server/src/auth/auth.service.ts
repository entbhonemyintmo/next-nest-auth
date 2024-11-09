import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';
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
}
