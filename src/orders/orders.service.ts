import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/order_details/entities/order_details.entity';
import { OrderDetailsService } from 'src/order_details/order_details.service';

@Injectable()
export class OrdersService {
  // _orderDetailsService = inject(OrderDetailsService);

  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    // @InjectRepository(OrderDetails)
    // private ordersDetailsRepository: Repository<OrderDetails>

    private readonly _orderDetailsService: OrderDetailsService
  ) {}

  async create(createOrderDto: CreateOrderDto, ownerId?: number) {

    console.warn('incom data', createOrderDto);
    console.warn('incom details', createOrderDto['details']);

    const result = await this.ordersRepository.createQueryBuilder()
      .insert()
      .into(Order)
      .values(createOrderDto)
      .returning("*") 
      .execute();

    // console.warn('check #############', createOrderDto['details'], result.raw[0]?.id, result.raw.user_id, ownerId, 'and result is', Boolean(createOrderDto['details'] && result.raw.id && (result.raw.user_id || ownerId)) )
    


    // if (createOrderDto['details'] && result.raw[0]?.id && (result.raw[0]?.user_id || ownerId)) {

    //   this._orderDetailsService.create({
    //     order_id: result.raw[0]?.id,
    //     details: createOrderDto['details'],
    //     author: ownerId ? ownerId : result.raw[0]?.user_id,
    //     hidden: false
    //   })
    // }

    console.log("Inserted order:", result); 


        // (async function(){
      const order_id = result.raw[0]?.id;
      const details = createOrderDto['details'];
      const author = ownerId ? ownerId : result.raw[0]?.user_id;
      const hidden = false;

      if ( details && order_id && author ) {
        const detailsResult = await this._orderDetailsService.create({ order_id, details, author, hidden });
        console.warn('WRFFFFFFFFFFFFFFFFFFFFFF', detailsResult);
      }

    // })();


    return result.raw;


    // const orderData = this.ordersRepository.create(createOrderDto);
    // return this.ordersRepository.save(orderData);
  }

  async findAll() {
    const orders = this.ordersRepository.find();
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
    const result = await this.ordersRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }
}
