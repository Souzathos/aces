import { ConflictError, NotFoundError } from "../errors";
import { User } from "../models/User";
import { PatientRepo, CreatePatientData, UpdatePatientData } from "../repositories/PatientRepo";
import { userDTO, UserRepo } from "../repositories/UserRepo";

const patientRepo = new PatientRepo();
const userRepo = new UserRepo();

export class PatientService {
  async create(patientData: CreatePatientData, userData: userDTO) {
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

    const patient = { ...patientData, user_id: userId } as CreatePatientData;
    return patientRepo.create(patient);
  }

  async update(cpf: string, patientData: UpdatePatientData) {
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