import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn
}
from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  user_id: number;

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

}