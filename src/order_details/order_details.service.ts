import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailsDto } from './dto/create-order_details.dto';
import { UpdateOrderDetailsDto } from './dto/update-order_details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order_details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {

  constructor(
    @InjectRepository(OrderDetails)
    private ordersDetailsRepository: Repository<OrderDetails>
  ) {}
  
  create(createOrderDetailsDto: CreateOrderDetailsDto): Promise<OrderDetails> {
    const order = this.ordersDetailsRepository.create(createOrderDetailsDto);
    return this.ordersDetailsRepository.save(order);
  }

  async findAll(withDeleted?: boolean): Promise<OrderDetails[]> {
    const ordersDetails = this.ordersDetailsRepository.find({withDeleted});
    if (!ordersDetails) {
      throw new NotFoundException(`There is no order-details at all`);
    }
    return ordersDetails;
  }

  async findOne(id: number): Promise<OrderDetails> {
    const orderDetails = await this.ordersDetailsRepository.findOneBy({ id }) 
    if (!orderDetails) {
      throw new NotFoundException(`Order-details with ID ${id} not found`);
    }
    return orderDetails;
  }

  async findDetailsByOrderId(order_id: number): Promise<OrderDetails[]> {
    const orderDetails = await this.ordersDetailsRepository.findBy({ order_id });
    if (!orderDetails) {
      throw new NotFoundException(`No order-details found for order with id ${order_id}`);
    }
    return orderDetails;
  }

  async update(id: number, updateOrderDetailsDto: UpdateOrderDetailsDto) {
    await this.ordersDetailsRepository.update({id}, updateOrderDetailsDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.ordersDetailsRepository.softDelete(Number(id));
    if (result.affected === 0) {
      throw new NotFoundException(`Order-details with ID ${id} not found`);
    }
  }

  async hardRemove(id: number) {
    const result = await this.ordersDetailsRepository.delete(Number(id));
    if (result.affected === 0) {
      throw new NotFoundException(`Order-details with ID ${id} not found`);
    }
  }
}
