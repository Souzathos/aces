
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Prescription } from "./Prescription";

@Entity("prescription_medications")
export class PrescriptionMedication {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Prescription, (prescription) => prescription.medications, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "prescription_id" })
    prescription!: Prescription;
}
