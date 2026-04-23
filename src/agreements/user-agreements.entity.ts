import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agreement } from "./entities/agreement.entity";

@Entity('user_agreements')
export class UserAgreements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  agreement_id: number;

  @OneToOne(() => Agreement)
  agreement: Agreement;


  @Column({ type: 'integer' })
  user_id: number;

  @OneToOne(() => User)
  user: User;
}
