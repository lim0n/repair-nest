import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";

@Entity('user_roles')
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  role_id: number;

  @OneToOne(() => Role)
  role: Role;


  @Column({ type: 'integer' })
  user_id: number;

  @OneToOne(() => User)
  user: User;
}
