import { Patient } from './../models/Patient';
import { CreatePatientDTO, UpdatePatientDTO } from "../dtos/patient";
import { UserRoles } from "../enums/UserRoles";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { User } from "../models/User";
import { PatientRepo } from "../repositories/PatientRepo";
import { UserRepo } from "../repositories/UserRepo";
import { passwordHandler } from "./UserService";

const patientRepo = new PatientRepo();
const userRepo = new UserRepo();

export class PatientService {
  async create(patientData: Partial<Patient>) {
    const patientExists = await patientRepo.findByCpf(patientData.cpf as string);

    if (patientExists) {
      throw new ConflictError("Patient already exists");
    }

    const user = await userRepo.findByCpf(patientData.cpf as string);
    
    if (!user) {
      throw new ConflictError("User not found");
    }
    
    patientData.user = user;

    const createdPatient = await patientRepo.create(patientData as Patient);
    const safe = passwordHandler(createdPatient.user)

    return {...createdPatient, user: safe};
  }

  async update(id: number, patientData: Partial<Patient>) {
    const { bloodType } = patientData;
    const patientExists = await patientRepo.findById(id);

    if (!patientExists) {
      throw new NotFoundError("Patient not found");
    }

    const updatedPatient = await patientRepo.update(id, { bloodType })
    
    return updatedPatient;
  }

  async delete(id: number) {
    const patientExists = await patientRepo.findById(id);

    if (!patientExists) {
      throw new NotFoundError("Patient not found");
    }

    await patientRepo.delete(id);
  }

  async listByCpf(cpf: string) {
    const patient = await patientRepo.findByCpf(cpf)

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }
    const safe = passwordHandler(patient.user)

    return {...patient,  user: safe};
  }

  async listById(id: number) {
      const patient = await patientRepo.findById(id)
  
      if (!patient) {
        throw new NotFoundError("Patient not found");
      }
  
      return patient;
    }

  async listAll() {
    let patients = await patientRepo.listAll();

    return patients;
  }
}
