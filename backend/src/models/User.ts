
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn({ type: "varchar", length: 14 })
  cpf!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  address!: string | null;

  @Column({ type: "varchar", length: 10, nullable: true })
  addressNumber!: string | null;

  @Column({ type: "varchar", length: 9, nullable: true })
  postalCode!: string | null;

  @Column({ type: "int", default: 2 })
  role!: number;
}
