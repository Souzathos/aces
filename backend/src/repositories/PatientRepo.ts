import { AppDataSorce } from "../config/data-source";
import { Patient } from "../models/Patient";

export type CreatePatientData = Pick<Patient, "cpf"> & {
  bloodType?: Patient["bloodType"];
};

export type UpdatePatientData = Partial<Pick<Patient, "bloodType">>;

export class PatientRepo {
  private patientRepository = AppDataSorce.getRepository(Patient);

  create(patientData: CreatePatientData) {
    const patient = this.patientRepository.create({
      ...patientData,
      bloodType: patientData.bloodType ?? null,
    });

    return this.patientRepository.save(patient);
  }

  async update(cpf: string, patientData: UpdatePatientData): Promise<Patient | null> {
    await this.patientRepository.update({ cpf }, patientData);
    return this.findByCpf(cpf);
  }

  async delete(cpf: string): Promise<void> {
    await this.patientRepository.delete({ cpf });
  }

  listAll() {
    return this.patientRepository.find();
  }

  findByCpf(cpf: string) {
    return this.patientRepository.findOneBy({ cpf });
  }
}