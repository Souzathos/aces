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
  async create(patientData: Partial<Patient>, cpf: string) {
    const patientExists = await patientRepo.findByCpf(cpf);

    if (patientExists) {
      throw new ConflictError("Patient already exists");
    }

    const user = await userRepo.findByCpf(cpf);
    
    if (!user) {
      throw new ConflictError("Doctor already exists");
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
    const safe = passwordHandler(updatedPatient?.user as User)

    return {...updatedPatient, user: safe};
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

    return {...patient,  safe};
  }

  async listAll() {
    let patients = await patientRepo.listAll();

    patients = patients.map((patient) => {
      const user = passwordHandler(patient.user)
      return {...patient, user} as Patient
    });

    return patients;
  }
}
