import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
  ManyToMany,
  JoinTable
}
from 'typeorm';
import type { IRole } from './role.type';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/orders/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.entity';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { Agreement } from 'src/agreements/entities/agreement.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

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
  async hashPassword?() {
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

  @OneToMany( () => RefreshToken,
            (token) => token.user,
            {cascade: ["soft-remove"]} )
  refreshTokens: RefreshToken[];

  @ManyToMany(() => Role, (role) => role.users, {cascade: true})
  @JoinTable({
      name: "user_roles",
      joinColumn: { name: "user_id", referencedColumnName: "id" },
      inverseJoinColumn: { name: "role_id", referencedColumnName: "id" }
  })
  roles: Role[];

  @ManyToMany(() => Agreement, (agreement) => agreement.users, {cascade: true})
  @JoinTable({
      name: "user_agreements",
      joinColumn: { name: "user_id", referencedColumnName: "id" },
      inverseJoinColumn: { name: "agreement_id", referencedColumnName: "id" }
  })
  agreements: Agreement[];

  // @OneToMany( () => OrderDetails,
  //             (orderDetails) => orderDetails.user,
  //             {cascade: ["soft-remove"]} )
  // messages: OrderDetails[];
}
