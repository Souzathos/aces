import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { MedicalHistory } from "./MedicalHistory";
import { PrescriptionMedication } from "./PrescriptionMedication";

@Entity("prescriptions")
export class Prescription {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "date" })
    prescriptionDate!: Date;

    @ManyToOne(() => Patient, (patient) => patient.medicalHistories, {
      nullable: false,
    })
    @JoinColumn({ name: "patient_cpf", referencedColumnName: "cpf" })
    patient!: Patient;

    @ManyToOne(() => Doctor, { nullable: false })
    @JoinColumn({ name: "doctor_id" })
    doctor!: Doctor;

    @OneToMany(
      () => PrescriptionMedication,
      (item) => item.prescription
    )
    medications!: PrescriptionMedication[];

    @OneToMany(() => MedicalHistory, (history) => history.prescription)
    medicalHistories!: MedicalHistory[];
}
