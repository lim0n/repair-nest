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
    // unique: true,
    length: 20
  })
  name: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли'})
  @Column({ 
    type: 'varchar',
    length: 90
  })
  description: string;





  // @Column()
  // user_id: number;

  // @ManyToMany( () => User,
  //              (user) => user.roles )
  // @JoinTable()
  // // @JoinTable({ name: 'user_roles' })
  // users: User[];

  @ManyToMany(() => User)
  @JoinTable({
      name: "user_roles", // table name for the junction table of this relation
      joinColumn: {
          name: "role_id",
          referencedColumnName: "id"
      },
      inverseJoinColumn: {
          name: "user_id",
          referencedColumnName: "id"
      }
  })
  users: User[];
}