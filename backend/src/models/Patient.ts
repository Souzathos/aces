
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Review } from "./Review";
import { UBS } from "./UBS";

@Entity("patients")
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 14, unique: true  })
  cpf!: string;

  @Column({ type: "varchar", length: 3, nullable: true })
  bloodType!: string | null;

  @OneToOne(() => User, (user) => user.patient)
  user: User;

  @OneToMany(() => Review, (review) => review.patient)
  reviews!: Review[];

  @ManyToOne(() => UBS, (ubs) => ubs.patients, {
    nullable: true,
  })
  @JoinColumn({ name: "ubs_id" })
  ubs!: UBS | null;
}
