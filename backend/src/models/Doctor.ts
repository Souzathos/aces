
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { UBS } from "./UBS";
import { Review } from "./Review";
import { User } from "./User";

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 14, unique: true  })
  cpf!: string;

  @Column({ type: "varchar", length: 20, unique: true })
  crm!: string;

  @Column({ type: "varchar", length: 100 })
  specialty!: string;

  @ManyToOne(() => UBS, (ubs) => ubs.doctors, {
    nullable: true,
  })
  @JoinColumn({ name: "ubs_id" })
  ubs!: UBS | null;

  @OneToOne(() => User, (user) => user.doctor)
  user: User;

  @OneToMany(() => Review, (review) => review.doctor)
  reviews!: Review[];
}
