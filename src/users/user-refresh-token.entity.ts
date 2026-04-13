import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('tokens')
export class RefreshToken {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ example: 'Neo', description: 'Логин'})
  @Column({
    type: 'string'
  })
  refreshToken?: string;

  @Column()
  user_id: number;

  @ManyToOne( () => User,
              (user) => user.refreshTokens,
              {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "user_id" })
  user: User;
}