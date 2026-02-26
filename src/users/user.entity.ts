import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

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
    length: 90
   })
  password?: string;

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
  user_role?: 'admin' | 'manager' | 'editor' | 'viewer';

  @Column({
    nullable: true,
    type: 'timestamptz'
  })
  created_at: Date;

  @Column({ 
    nullable: true,
    type: 'timestamptz'
  })
  updated_at: Date;

  @Column({ 
    nullable: true,
    type: 'timestamptz'
  })
  @DeleteDateColumn()
  deleted_at: Date;

}