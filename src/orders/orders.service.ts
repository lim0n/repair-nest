import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailsDto } from 'src/order_details/dto/create-order_details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetailsService } from 'src/order_details/order_details.service';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly _orderDetailsService: OrderDetailsService
  ) {}

  async create(createOrderDto: CreateOrderDto, ownerId?: number) {
    const result = await this.ordersRepository.createQueryBuilder()
      .insert()
      .into(Order)
      .values(createOrderDto)
      .returning("*") 
      .execute();

      if ( createOrderDto['details'] !== null && result.raw[0]?.id ) {
        const orderDetails = new CreateOrderDetailsDto();
        orderDetails.order_id = result.raw[0]?.id;
        orderDetails.details = createOrderDto['details'];
        orderDetails.author = ownerId ? ownerId : result.raw[0]?.user_id;
        await this._orderDetailsService.create(orderDetails);
      }

    return result.raw;
  }

  async findAll(withDeleted?: boolean) {
    const orders = this.ordersRepository.find({withDeleted});
    if (!orders) {
      throw new NotFoundException(`There is no orders at all`);
    }
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id }) 
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findOrdersByUserId(user_id: number): Promise<Order[]> {
    const orders = await this.ordersRepository.findBy({ user_id });
    if (!orders) {
      throw new NotFoundException(`No orders found for user with id ${user_id}`);
    }
    return orders;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.ordersRepository.update({id}, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    let result;

    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: [ 'order-details' ]
    });

    if (order !== null) {
      result = await this.ordersRepository.softRemove(order);
    }

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }

  async hardRemove(id: number) {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }
}
