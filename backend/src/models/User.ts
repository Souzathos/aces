
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserRoles } from "../enums/UserRoles";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 14, unique: true  })
  cpf!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  address: string | null;

  @Column({ type: "varchar", length: 10, nullable: true })
  addressNumber: string | null;

  @Column({ type: "varchar", length: 9, nullable: true })
  postalCode: string | null;

  @Column({ default: UserRoles.USER })
  role!: string;

  @OneToOne(() => Patient, (patient) => patient.user)
  @JoinColumn({ name: 'patient_cpf' })
  patient: Patient;

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  @JoinColumn({ name: 'doctor_cpf' })
  doctor?: Doctor;
}
