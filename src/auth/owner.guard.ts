import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const targetId = request.params.id;

    if (user && user.sub === targetId || user?.roles?.some(role => role.name === 'admin')) {
      return true;
    }

    throw new ForbiddenException('You can only update your own things');
  }
}
