import { CreatePatientDTOType, UpdatePatientDTOType } from "../dtos/patient";
import { ConflictError, NotFoundError } from "../errors";
import { PatientRepo } from "../repositories/PatientRepo";
import { UserRepo } from "../repositories/UserRepo";

const patientRepo = new PatientRepo();
const userRepo = new UserRepo();

export class PatientService {
  async create(patientData: CreatePatientDTOType) {

    const patientExists = await patientRepo.findByCpf(patientData.cpf);

    if (patientExists) {
      throw new ConflictError("Patient already exists");
    }

    return patientRepo.create(patientData);
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