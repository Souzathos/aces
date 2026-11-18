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

  async update(crm: string, doctorData: Partial<Doctor>) {
    await this.doctorRepository.update({ crm }, doctorData);
    return this.findByCrm(crm);
  }

  async delete(crm: string) {
    await this.doctorRepository.delete({ crm });
  }

  listAll() {
    return this.doctorRepository.find();
  }

  findByCrm(crm: string) {
    return this.doctorRepository.findOneBy({ crm });
  }
}