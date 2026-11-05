import { CreatePatientDTOType, UpdatePatientDTOType } from "../dtos/patient";
import { CreateUserDTOType } from "../dtos/user";
import { ConflictError, NotFoundError } from "../errors";
import { Patient } from "../models/Patient";
import { User } from "../models/User";
import { PatientRepo } from "../repositories/PatientRepo";
import { UserRepo } from "../repositories/UserRepo";

const patientRepo = new PatientRepo();
const userRepo = new UserRepo();

export class PatientService {
  async create(patientData: CreatePatientDTOType, userData: CreateUserDTOType) {
    const userExists = await userRepo.findByCpf(patientData.cpf);
    let userId:number | null = null;
    
    if (!userExists) {
      const createdUser = await userRepo.create(userData as User);
      userId = createdUser.id;
    } else {
      userId = userExists.id;
    }

    const patientExists = await patientRepo.findByCpf(patientData.cpf);

    if (patientExists) {
      throw new ConflictError("Patient already exists");
    }

    const patient = { ...patientData, user_id: userId } as CreatePatientDTOType;
    return patientRepo.create(patient);
  }

  async update(cpf: string, patientData: UpdatePatientDTOType) {
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

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    return patient;
  }

  listAll() {
    return patientRepo.listAll();
  }
}