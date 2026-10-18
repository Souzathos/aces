
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { UBS } from "./UBS";
import { Patient } from "./Patient";

@Entity("attendances")
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: "datetime" })
  checkInDate!: Date;

  @Column({ type: "datetime", nullable: true })
  checkOutDate!: Date | null;

  @ManyToOne(() => UBS, (ubs) => ubs.attendances, {
    nullable: false,
  })
  @JoinColumn({ name: "ubs_id" })
  ubs!: UBS;

  @ManyToOne(() => Patient, (patient) => patient.attendances, {
    nullable: false,
  })
  @JoinColumn({ name: "patient_cpf", referencedColumnName: "cpf" })
  patient!: Patient;
}
