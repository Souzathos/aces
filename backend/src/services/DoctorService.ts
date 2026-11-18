import { ConflictError, NotFoundError } from "../errors";
import { Doctor } from "../models/Doctor";
import { User } from "../models/User";
import { DoctorRepo } from "../repositories/DoctorRepo";
import { UserRepo } from "../repositories/UserRepo";
import { passwordHandler } from "./UserService";


const doctorRepo = new DoctorRepo();
const userRepo = new UserRepo();

export class DoctorService {
  async create(doctorData: Partial<Doctor>, userData: User) {
    const userExists = await userRepo.findByCpf(userData.cpf as string);
    let userId:number | null = null;
    
    if (!userExists) {
      const createdUser = await userRepo.create(userData as User);
      userId = createdUser.id;
    } else {
      userId = userExists.id;
    }

    const doctorExists = await doctorRepo.findByCrm(doctorData.crm as string);

    if (doctorExists) {
      throw new ConflictError("Patient already exists");
    }

    const patient = { ...doctorData, user_id: userId as Partial<User> } as Doctor;
    return doctorRepo.create(patient);
  }

  async update(crm: string, doctorData: Partial<Doctor>) {
    const doctorExists = await doctorRepo.findByCrm(crm);

    if (!doctorExists) {
      throw new NotFoundError("Doctor not found");
    }

    const updatedDoctor = await doctorRepo.update(crm, doctorData);

    if (!updatedDoctor) {
      throw new NotFoundError("Doctor not found");
    }

    return updatedDoctor;
  }

  async delete(crm: string) {
    const doctorExists = await doctorRepo.findByCrm(crm);

    if (!doctorExists) {
      throw new NotFoundError("Doctor not found");
    }

    await doctorRepo.delete(crm)
  }

  async listByCpf(crm: string) {
    const doctor: Doctor | null = await doctorRepo.findByCrm(crm)
    const user = await userRepo.findById(Number(doctor?.user_id))

    if(!doctor) {
        throw new NotFoundError("Doctor not found")
    }

    if(!user) {
        throw new NotFoundError("The user of doctor not exists")
    }

    const safe = passwordHandler(user)

    return {
      doctor,
      safe
    };
  }

  listAll() {
    return doctorRepo.listAll();
  }
}