import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  BeforeUpdate
}
from 'typeorm';
import type { IRole } from './role.type';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/orders/entities/order.entity';
// import { OrderDetails } from 'src/order_details/entities/order_details.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: true,
    type: 'varchar',
    unique: true,
    length: 30
  })
  username?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255
   })
  password?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 4);
    }
  }

  @Column({
    nullable: true,
    type: 'varchar',
    unique: true,
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
    unique: true,
    length: 20
  })
  phone?: string;

  @Column({
    nullable: true,
    default: 'viewer'
  })
  user_role?: IRole;

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

  @OneToMany( () => Order,
              (order) => order.user,
              {cascade: ["soft-remove"]} )
  orders: Order[];

  // @OneToMany( () => OrderDetails,
  //             (orderDetails) => orderDetails.user,
  //             {cascade: ["soft-remove"]} )
  // messages: OrderDetails[];
}
