import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/libs/decorators';

@Injectable()
export class AccessJwtGuard extends AuthGuard('access-jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublicRoute = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getClass(),
            context.getHandler(),
        ]);

        console.log('debug: isPublicRoute: ', isPublicRoute);

        if (isPublicRoute) return true;

        return super.canActivate(context);
    }
}
