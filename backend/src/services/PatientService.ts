import { CreatePatientDTO, UpdatePatientDTO } from "../dtos/patient";
import { UserRoles } from "../enums/UserRoles";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { PatientRepo } from "../repositories/PatientRepo";
import { UserRepo } from "../repositories/UserRepo";
import { passwordHandler } from "./UserService";

const patientRepo = new PatientRepo();
const userRepo = new UserRepo();
const userService = new UserService();

export class PatientService {
  async create(data: unknown) {
    const parsed = CreatePatientDTO.safeParse(data ?? {});
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }
    const { cpf, bloodType, ...userData } = parsed.data;

    const patientExists = await patientRepo.findByCpf(cpf);
    if (patientExists) {
      throw new ConflictError("Patient already exists");
    }

    const patient = { ...patientData, user_id: userId as Partial<Patient> } as Patient;
    return patientRepo.create(patient);
  }

  async update(cpf: string, patientData: Partial<Patient>) {
    const patientExists = await patientRepo.findByCpf(cpf);

    const { bloodType, ...userData } = patientData;

    const userId = await patientRepo.findUserIdByCpf(cpf);
    if (userId === null) {
      throw new NotFoundError("Patient not found");
    }

    if (Object.keys(userData).length > 0) {
      await userService.update(userId, userData);
    }

    const updatedPatient =
      bloodType !== undefined
        ? await patientRepo.update(cpf, { bloodType })
        : await patientRepo.findByCpf(cpf);

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
