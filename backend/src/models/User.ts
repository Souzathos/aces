
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 14 })
  cpf!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  address!: string | null;

  @Column({ type: "varchar", length: 10, nullable: true })
  addressNumber!: string | null;

  @Column({ type: "varchar", length: 9, nullable: true })
  postalCode!: string | null;

  @Column({ default: 2 })
  role!: number;
}
