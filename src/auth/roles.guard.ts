import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { IRole } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<IRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) {
        return true;
      }
  
      const { user } = context.switchToHttp().getRequest();
      return user?.roles.some((role) => requiredRoles.includes(role.name));
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
