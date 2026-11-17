import { AppDataSorce } from "../config/data-source";
import { Patient } from "../models/Patient";
import { User } from "../models/User";

type CreatePatientRecord = {
  cpf: string;
  bloodType?: string | null;
  userId: number;
};

type UpdatePatientRecord = {
  bloodType?: string | null;
};

export class PatientRepo {
  private patientRepository = AppDataSorce.getRepository(Patient);

  create({ cpf, bloodType, userId }: CreatePatientRecord) {
    const patient = this.patientRepository.create({
      cpf,
      bloodType: bloodType ?? null,
      user_id: { id: userId } as User,
    });

    return this.patientRepository.save(patient);
  }

  async update(cpf: string, patientData: UpdatePatientRecord): Promise<Patient | null> {
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

  async findUserIdByCpf(cpf: string): Promise<number | null> {
    const patient = await this.patientRepository.findOne({
      where: { cpf },
      relations: { user_id: true },
    });

    return patient?.user_id?.id ?? null;
  }
}
