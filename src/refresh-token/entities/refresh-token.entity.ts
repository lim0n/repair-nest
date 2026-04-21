import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/user.entity";

@Entity('tokens')
export class RefreshToken {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Абракадабра', description: 'JWT Токен'})
  @Column({
    type: 'varchar',
    length: 512
  })
  refreshToken: string;

  @Column()
  user_id: number;

  @Column({
    nullable: true,
    type: 'timestamptz'
  })
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne( () => User,
              (user) => user.refreshTokens,
              {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "user_id" })
  user: User;
}
