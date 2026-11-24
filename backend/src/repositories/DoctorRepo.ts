import { AppDataSorce } from "../config/data-source";
import { CreateDoctorDTOType } from "../dtos/doctor";
import { Doctor } from "../models/Doctor";


export class DoctorRepo {
  private doctorRepository = AppDataSorce.getRepository(Doctor);

  create(doctorData: Doctor) {
    const doctor = this.doctorRepository.create({
      ...doctorData
    });

    return this.doctorRepository.save(doctor);
  }

  async update(id: number, doctorData: Partial<Doctor>) {
    await this.doctorRepository.update(id, doctorData);
    return this.findById(id);
  }

  async delete(id: number) {
    await this.doctorRepository.delete({ id });
  }

  listAll() {
    return this.doctorRepository.find();
  }

  findById(id: number) {
    return this.doctorRepository.findOneBy({ id });
  }

  findByCrm(crm: string) {
    return this.doctorRepository.findOneBy({ crm });
  }

  async findByCpf(cpf: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { user: { cpf } },
      relations: { user: true },
    });

    return doctor ?? null;
  }
}