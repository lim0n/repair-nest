import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('order_details')
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  order_id: number;

  @Column({
    nullable: true,
    type: 'text'
  })
  details: string;

  @Column()
  author: number;

  @Column({
    nullable: true,
    type: 'boolean'
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
