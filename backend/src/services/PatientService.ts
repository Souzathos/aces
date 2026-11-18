import { CreatePatientDTOType, UpdatePatientDTOType } from "../dtos/patient";
import { CreateUserDTOType } from "../dtos/user";
import { ConflictError, NotFoundError } from "../errors";
import { Patient } from "../models/Patient";
import { User } from "../models/User";
import { PatientRepo } from "../repositories/PatientRepo";
import { UserRepo } from "../repositories/UserRepo";
import { passwordHandler } from "./UserService";

const patientRepo = new PatientRepo();
const userRepo = new UserRepo();

export class PatientService {
  async create(patientData: Partial<CreatePatientDTOType>, userData: CreateUserDTOType) {
    
    const userExists = await userRepo.findByCpf(patientData.cpf as string);
    let userId:number | null = null;
    
    if (!userExists) {
      const createdUser = await userRepo.create(userData as User);
      userId = createdUser.id;
    } else {
      userId = userExists.id;
    }

    const patientExists = await patientRepo.findByCpf(patientData.cpf as string);

    if (patientExists) {
      throw new ConflictError("Patient already exists");
    }

    const patient = { ...patientData, user_id: userId as Partial<Patient> } as Patient;
    return patientRepo.create(patient);
  }

  async update(cpf: string, patientData: Partial<Patient>) {
    const patientExists = await patientRepo.findByCpf(cpf);

    if (!patientExists) {
      throw new NotFoundError("Patient not found");
    }

    const updatedPatient = await patientRepo.update(cpf, patientData);

    if (!updatedPatient) {
      throw new NotFoundError("Patient not found");
    }

    return updatedPatient;
  }

  async delete(cpf: string) {
    const patientExists = await patientRepo.findByCpf(cpf);

    if (!patientExists) {
      throw new NotFoundError("Patient not found");
    }

    await patientRepo.delete(cpf);
  }

  async listByCpf(cpf: string) {
    const patient = await patientRepo.findByCpf(cpf);
    const user = await userRepo.findById(Number(patient?.user_id))

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    if(!user) {
        throw new NotFoundError("The user of doctor not exists")
    }

    const safe = passwordHandler(user)

    return {
      patient,
      safe
    };
  }

  listAll() {
    return patientRepo.listAll();
  }
}