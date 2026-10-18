
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { UBS } from "./UBS";
import { MedicalHistory } from "./MedicalHistory";
import { Review } from "./Review";
import { Presence } from "./Presence";

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

  @OneToMany(() => MedicalHistory, (history) => history.doctor)
  medicalHistories!: MedicalHistory[];

  @OneToMany(() => Review, (review) => review.doctor)
  reviews!: Review[];

  @OneToMany(() => Presence, (presence) => presence.doctor)
  presences!: Presence[];
}
