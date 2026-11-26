import { Patient } from "../models/Patient";
import { CreatePatientDTO, CreatePatientDTOType, UpdatePatientDTO, UpdatePatientDTOType } from "../dtos/patient";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { PatientRepo } from "../repositories/PatientRepo";
import { UserRepo } from "../repositories/UserRepo";
import { passwordHandler } from "./UserService";

const patientRepo = new PatientRepo();
const userRepo = new UserRepo();

export class PatientService {
  async create(data: Pick<CreatePatientDTOType, "cpf" | "bloodType">) {
    const parsed = CreatePatientDTO.pick({ cpf: true, bloodType: true }).safeParse(data ?? {});
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }
    const { cpf, bloodType } = parsed.data;

    const patientExists = await patientRepo.findByCpf(cpf);

    if (patientExists) {
      throw new ConflictError("Patient already exists");
    }

    const user = await userRepo.findByCpf(cpf);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const createdPatient = await patientRepo.create({ cpf, bloodType, user } as Patient);
    const safe = passwordHandler(createdPatient.user);

    return { ...createdPatient, user: safe };
  }

  async update(id: number, data: UpdatePatientDTOType) {
    const parsed = UpdatePatientDTO.safeParse(data ?? {});
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }
    const { bloodType } = parsed.data;
    if (bloodType === undefined) {
      throw new BadRequestError("At least one patient field must be provided");
    }

    const patientExists = await patientRepo.findById(id);

    if (!patientExists) {
      throw new NotFoundError("Patient not found");
    }

    const updatedPatient = await patientRepo.update(id, { bloodType });

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
    const patient = await patientRepo.findByCpf(cpf);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }
    const safe = passwordHandler(patient.user);

    return { ...patient, user: safe };
  }

  async listById(id: number) {
    const patient = await patientRepo.findById(id);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    return patient;
  }

  async listAll() {
    const patients = await patientRepo.listAll();

    return patients;
  }
}
