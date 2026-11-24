import { ConflictError, NotFoundError } from "../errors";
import { Doctor } from "../models/Doctor";
import { User } from "../models/User";
import { DoctorRepo } from "../repositories/DoctorRepo";
import { UserRepo } from "../repositories/UserRepo";
import { passwordHandler } from "./UserService";


const doctorRepo = new DoctorRepo();
const userRepo = new UserRepo();

export class DoctorService {
  async create(doctorData: Partial<Doctor>) {
    const doctorExists = await doctorRepo.findByCrm(doctorData.crm as string);

    if (doctorExists) {
      throw new ConflictError("Doctor already exists");
    }

    const user = await userRepo.findByCpf(doctorData.cpf as string);

    if (!user) {
      throw new ConflictError("User not found");
    }

    doctorData.user = user;

    const createdDoctor = await doctorRepo.create(doctorData as Doctor);

    const safe = passwordHandler(createdDoctor.user)

    return {...createdDoctor, user: safe};
  }

  async update(id: number, doctorData: Partial<Doctor>) {
    const doctorExists = await doctorRepo.findById(id);

    if (!doctorExists) {
      throw new NotFoundError("Doctor not found");
    }

    const updatedDoctor = await doctorRepo.update(id, doctorData);

    return updatedDoctor;
  }

  async delete(id: number) {
    const doctorExists = await doctorRepo.findById(id);

    if (!doctorExists) {
      throw new NotFoundError("Doctor not found");
    }

    await doctorRepo.delete(id);
  }

  async listByCrm(crm: string) {
    const doctor: Doctor | null = await doctorRepo.findByCrm(crm)
    
    if(!doctor) {
        throw new NotFoundError("Doctor not found")
    }

    const safe = passwordHandler(doctor.user)

    return {...doctor, user: safe};
  }

  async listByCpf(cpf: string) {
    const doctor = await doctorRepo.findByCpf(cpf)

    if (!doctor) {
      throw new NotFoundError("doctor not found");
    }

    const safe = passwordHandler(doctor.user)

    return {...doctor,  user: safe};
  }
    

  async listAll() {
    let doctors = await doctorRepo.listAll();

    return doctors;
  }
}