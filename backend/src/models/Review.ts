
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  rating!: number;

  @Column({ type: "date" })
  reviewDate!: Date;

  @Column({ type: "text", nullable: true })
  comment!: string | null;

  @ManyToOne(() => Patient, (patient) => patient.reviews, {
    nullable: false,
  })
  @JoinColumn({ name: "patient_cpf", referencedColumnName: "cpf" })
  patient!: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.reviews, {
    nullable: false,
  })
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;
}
