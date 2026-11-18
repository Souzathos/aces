
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Review } from "./Review";

@Entity("patients")
export class Patient {
  @PrimaryColumn({ type: "varchar", length: 14 })
  cpf!: string;

  @Column({ type: "varchar", length: 3, nullable: true })
  bloodType!: string | null;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user_id!: User;

  @OneToMany(() => Review, (review) => review.patient)
  reviews!: Review[];

}
