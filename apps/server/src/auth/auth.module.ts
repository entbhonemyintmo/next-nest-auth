import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { accessJwtConfig, refreshJwtConfig } from './configs';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        ConfigModule.forFeature(accessJwtConfig),
        ConfigModule.forFeature(refreshJwtConfig),
        JwtModule.registerAsync(accessJwtConfig.asProvider()),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
