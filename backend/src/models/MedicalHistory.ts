
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";
import { Prescription } from "./Prescription";

@Entity("medical_histories")
export class MedicalHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  consultationDate!: Date;

  @ManyToOne(() => Patient, (patient) => patient.medicalHistories, {
    nullable: false,
  })
  @JoinColumn({ name: "patient_cpf", referencedColumnName: "cpf" })
  patient!: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalHistories, {
    nullable: false,
  })
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @ManyToOne(
    () => Prescription,
    (prescription) => prescription.medicalHistories,
    { nullable: false }
  )
  @JoinColumn({ name: "prescription_id" })
  prescription!: Prescription;
}
