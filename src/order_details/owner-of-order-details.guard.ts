import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrdersService } from 'src/orders/orders.service';


@Injectable()
export class OwnerOfOrderOfOrderDetailsGuard implements CanActivate {
  constructor(
    private ordersService: OrdersService,
    private orderDetailsService: OrderDetailsService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orderDetailsId = request.params.id;
    
    if (!user || !orderDetailsId) return false;

    const orderDetailsRecord = await this.orderDetailsService.findOne(orderDetailsId);
    const orderRecord = await this.ordersService.findOne(orderDetailsRecord.order_id);

    if (orderRecord && orderRecord.user_id === user.sub || user.role === 'admin') {
      return true;
    }

    throw new ForbiddenException('You do not own this resource');
  }
}
