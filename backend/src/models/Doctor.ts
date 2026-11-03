
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { UBS } from "./UBS";
import { Review } from "./Review";
import { User } from "./User";

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 20, unique: true })
  crm!: string;

  @ManyToOne(() => UBS, (ubs) => ubs.doctors, {
    nullable: false,
  })
  @JoinColumn({ name: "ubs_id" })
  ubs!: UBS;

  @OneToOne(() => User)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  user_id!: User;

  @OneToMany(() => Review, (review) => review.doctor)
  reviews!: Review[];
}
