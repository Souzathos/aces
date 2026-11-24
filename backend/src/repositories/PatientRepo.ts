import { partial } from "zod/mini";
import { AppDataSorce } from "../config/data-source";
import { Patient } from "../models/Patient";
import { User } from "../models/User";

export class PatientRepo {
  private patientRepository = AppDataSorce.getRepository(Patient);

  create(patientData: Patient) {
    const patient = this.patientRepository.create(
      patientData
    );

    return this.patientRepository.save(patient);
  }

  async update(id: number, patientData: Partial<Patient>): Promise<Patient | null> {
    await this.patientRepository.update({ id }, patientData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.patientRepository.delete({ id });
  }

  listAll() {
    return this.patientRepository.find();
  }

  findById(id: number) {
    return this.patientRepository.findOneBy({ id });
  }

  async findByCpf(cpf: string) {
    const patient = await this.patientRepository.findOne({
      where: { user: { cpf } },
      relations: { user: true },
    });

    return patient ?? null;
  }
}
