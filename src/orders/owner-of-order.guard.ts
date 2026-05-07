import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Injectable()
export class OwnerOfOrderGuard implements CanActivate {
  constructor(private ordersService: OrdersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const targetId = request.params.id;
    
    if (!user || !targetId) return false;

    const resource = await this.ordersService.findOne(targetId);

    if (resource && resource.user_id === user.sub || user.role === 'admin') {
      return true;
    }

    throw new ForbiddenException('You do not own this resource');
  }
}
