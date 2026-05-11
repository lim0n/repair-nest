import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OwnerOfOrderGuard implements CanActivate {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const targetId = request.params.id;
    
    if (!user || !targetId) return false;

    const resource = await this.ordersRepository.findOne({
      where: { id: targetId },
      relations: [ 'order_details' ]
    })

    if (resource && resource.user_id === user.sub || user?.roles?.some(role => role.name === 'admin') ) {
      return true;
    }

    throw new ForbiddenException('You do not own this resource');
  }
}
