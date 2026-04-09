import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя'})
  @Column({ 
    type: 'varchar',
    unique: true,
    length: 20
  })
  name: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли'})
  @Column({ 
    type: 'varchar',
    length: 90,
    nullable: true
  })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}