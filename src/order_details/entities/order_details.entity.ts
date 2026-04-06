import { Order } from 'src/orders/entities/order.entity';
// import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('order_details')
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  order_id: number;

  @ManyToOne( () => Order,
              (order) => order.orderDetails,
              {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({
    nullable: true,
    type: 'text'
  })
  details: string;

  @Column()
  author: number;

  // @ManyToOne( () => User,
  //             (user) => user.messages,
  //             {onDelete: 'CASCADE'})
  // @JoinColumn({ name: "user_id" })
  // user: User;

  @Column({
    nullable: true,
    type: 'boolean',
    default: false
   })
  hidden: boolean;

  @Column({
    nullable: true,
    type: 'timestamptz'
  })
  @CreateDateColumn()
  created_at: Date;

  @Column({ 
    nullable: true,
    type: 'timestamptz'
  })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ 
    nullable: true,
    type: 'timestamptz'
  })
  @DeleteDateColumn()
  deleted_at: Date;
}
