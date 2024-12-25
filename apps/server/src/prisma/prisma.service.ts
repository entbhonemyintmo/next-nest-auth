import { Global, Injectable, OnModuleInit, OnModuleDestroy, BeforeApplicationShutdown, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy, BeforeApplicationShutdown {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({ log: ['info', 'warn', 'error'] });
    }

    async onModuleInit() {
        try {
            await this.$connect();
        } catch (error) {
            this.logger.error('Error connecting to the database:', error);
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect();
        } catch (error) {
            this.logger.error('Error connecting to the database:', error);
        }
    }

    async beforeApplicationShutdown() {
        try {
            await this.$disconnect();
        } catch (error) {
            this.logger.error('Error connecting to the database:', error);
        }
    }
}
