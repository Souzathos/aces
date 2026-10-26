
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn()
  id!: number;

  @Column({ length: 14 })
  cpf!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 20, nullable: true })
  phone!: string | null;

  @Column({ length: 150, nullable: true })
  address!: string | null;

  @Column({ length: 10, nullable: true })
  addressNumber!: string | null;

  @Column({ length: 9, nullable: true })
  postalCode!: string | null;

  @Column({ type: "int", default: 2 })
  role!: number;
}
