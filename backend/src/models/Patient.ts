
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { MedicalHistory } from "./MedicalHistory";
import { Review } from "./Review";
import { Attendance } from "./Attendance";
import { Presence } from "./Presence";

@Entity("patients")
export class Patient {
  @PrimaryColumn({ type: "varchar", length: 14 })
  cpf!: string;

  @Column({ type: "varchar", length: 3, nullable: true })
  bloodType!: string | null;

  @OneToOne(() => User)
  @JoinColumn({ name: "cpf", referencedColumnName: "cpf" })
  user!: User;

  @OneToMany(() => MedicalHistory, (history) => history.patient)
  medicalHistories!: MedicalHistory[];

  @OneToMany(() => Review, (review) => review.patient)
  reviews!: Review[];

  @OneToMany(() => Attendance, (attendance) => attendance.patient)
  attendances!: Attendance[];

  @OneToMany(() => Presence, (presence) => presence.patient)
  presences!: Presence[];
}
