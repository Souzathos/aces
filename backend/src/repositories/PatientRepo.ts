import { AppDataSorce } from "../config/data-source";
import { CreatePatientDTOType, UpdatePatientDTOType } from "../dtos/patient";
import { Patient } from "../models/Patient";

export class PatientRepo {
  private patientRepository = AppDataSorce.getRepository(Patient);

  create(patientData: CreatePatientDTOType) {
    const patient = this.patientRepository.create({
      ...patientData,
      bloodType: patientData.bloodType ?? null,
    });

    return this.patientRepository.save(patient);
  }

  async update(cpf: string, patientData: UpdatePatientDTOType): Promise<Patient | null> {
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