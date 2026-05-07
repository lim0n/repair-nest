import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';


@Injectable()
export class MatchDtoOrderIdToUserGuard implements CanActivate {
  constructor(
    private ordersService: OrdersService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body;
    
    if (!user) return false;

    const orderRecord = await this.ordersService.findOne(request.body.order_id);

    if (orderRecord && orderRecord.user_id === user.sub || user.role === 'admin' || user.role === 'manager') {
      return true;
    }

    throw new ForbiddenException('You do not own this resource');
  }
}
