import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create({ password, ...res }: CreateUserDto): Promise<User> {
        const hashedPassword = await hash(password);

        return this.prisma.user.create({
            data: { ...res, password: hashedPassword },
        });
    }

    findOne(id: number) {
        return this.prisma.user.findUniqueOrThrow({ where: { id } });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }
}
