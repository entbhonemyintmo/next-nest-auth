import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { accessJwtConfig, refreshJwtConfig } from './configs';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessJwtStrategy } from './strategies';
import { AccessJwtGuard } from './guards';

@Module({
    imports: [
        UserModule,
        ConfigModule.forFeature(accessJwtConfig),
        ConfigModule.forFeature(refreshJwtConfig),
        JwtModule.registerAsync(accessJwtConfig.asProvider()),
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessJwtStrategy, { provide: APP_GUARD, useClass: AccessJwtGuard }],
})
export class AuthModule {}
