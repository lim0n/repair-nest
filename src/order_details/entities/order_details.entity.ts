import { Order } from 'src/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('order_details')
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  order_id: number;

  // @Column()
  // @ManyToOne( () => Order,
  //             (order) => order.orderDetails, 
  //             { onDelete: 'CASCADE',
  //               // orphanedRowAction: 'soft-delete'
  //              })
  // @JoinColumn()
  // order_id: number;

  @ManyToOne(() => Order, { onDelete: 'CASCADE'})
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({
    nullable: true,
    type: 'text'
  })
  details: string;

  @Column()
  author: number;

  // @ManyToOne(() => User, (user) => user.orders, { 
  //     onDelete: 'CASCADE' 
  // })
  // user_id: User;

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
