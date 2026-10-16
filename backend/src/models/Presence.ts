import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

@Entity({ name: "presences" })
export class Presence {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Patient, (patient) => patient.presences, {
    eager: true,
    onDelete: "CASCADE",
  })
  patient!: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.presences, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  doctor?: Doctor;

  @Column({ type: "date" })
  date!: string;

  @Column({
    type: "enum",
    enum: ["present", "absent", "late"],
    default: "present",
  })
  status!: "present" | "absent" | "late";

  @Column({ type: "varchar", length: 255, nullable: true })
  observation?: string;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;
}
