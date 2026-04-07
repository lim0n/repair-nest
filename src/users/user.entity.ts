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
import { ApiProperty } from '@nestjs/swagger';
// import { OrderDetails } from 'src/order_details/entities/order_details.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ example: 'Neo', description: 'Логин'})
  @Column({
    nullable: true,
    type: 'varchar',
    unique: true,
    length: 30
  })
  username?: string;

  @ApiProperty({ example: 'Matr1x', description: 'Пароль'})
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

  @ApiProperty({ example: 'Neo@matrix.com', description: 'Адрес электронной почты'})
  @Column({
    nullable: true,
    type: 'varchar',
    unique: true,
    length: 50
  })
  email?: string;

  @ApiProperty({ example: 'Томас Андерсон', description: 'Полное имя пользователя'})
  @Column({ 
    nullable: true,
    type: 'varchar',
    length: 90
  })
  name?: string;

  @ApiProperty({ example: '+79168048533', description: 'Номер телефона'})
  @Column({
    nullable: true,
    type: 'varchar',
    unique: true,
    length: 20
  })
  phone?: string;

  @ApiProperty({ example: 'Manager', description: 'Роль пользователя'})
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
