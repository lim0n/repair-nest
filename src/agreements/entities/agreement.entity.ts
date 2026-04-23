import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('agreements')
export class Agreement {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'obrabotka_pdn', description: 'Снейк-кейс транслит для Обработка ПДН'})
  @Column({ 
    type: 'varchar',
    unique: true,
    length: 20
  })
  name: string;

  @ApiProperty({ example: 'Текст соглаСогласие субъектов персональных данных на обработку персональных данных...', description: 'Текст соглашения'})
  @Column({ 
    type: 'text',
    nullable: true
  })
  description: string;

  @ManyToMany(() => User, (user) => user.agreements)
  users: User[];
}
