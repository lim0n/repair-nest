import { OrderDetails } from 'src/order_details/entities/order_details.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
}
from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  user_id: number;

  // @Column({ nullable: true })
  // @ManyToOne( () => User,
  //             (user) => user.orders,
  //             { onDelete: 'CASCADE',
  //               // orphanedRowAction: 'soft-delete'
  //              })
  // @JoinColumn()
  // user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50
  })
  email?: string;

  @Column({ 
    nullable: true,
    type: 'varchar',
    length: 90
  })
  name?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 20
  })
  phone?: string;

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

  @OneToMany( () => OrderDetails,
              (order_details) => order_details.order_id,
              { 
                onDelete: 'CASCADE',
                cascade: true
              })
  orderDetails: OrderDetails[];

}