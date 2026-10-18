
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Doctor } from "./Doctor";
import { Attendance } from "./Attendance";

@Entity("ubs")
export class UBS {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", default: 0 })
  patientCount!: number;

  @Column({ type: "int", default: 0 })
  employeeCount!: number;

  @Column({ type: "varchar", length: 150 })
  address!: string;

  @Column({ type: "varchar", length: 10 })
  addressNumber!: string;

  @Column({ type: "varchar", length: 9 })
  postalCode!: string;

  @OneToMany(() => Doctor, (doctor) => doctor.ubs)
  doctors!: Doctor[];

  @OneToMany(() => Attendance, (attendance) => attendance.ubs)
  attendances!: Attendance[];
}
