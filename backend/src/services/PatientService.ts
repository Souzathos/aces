import { CreatePatientDTO, UpdatePatientDTO } from "../dtos/patient";
import { UserRoles } from "../enums/UserRoles";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";
import { PatientRepo } from "../repositories/PatientRepo";
import { UserRepo } from "../repositories/UserRepo";
import { UserService } from "./UserService";

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

    // Se já existe um usuário com esse CPF, só vincula o paciente a ele.
    // Senão, cria o usuário (com hash de senha e checagem de email) antes.
    const existingUser = await userRepo.findByCpf(cpf);
    const userId = existingUser
      ? existingUser.id
      : (await userService.createUser({ ...userData, cpf, role: UserRoles.USER })).id;

    return patientRepo.create({ cpf, bloodType, userId });
  }

  async update(cpf: string, data: unknown) {
    const parsed = UpdatePatientDTO.safeParse(data ?? {});
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }
    const patientData = parsed.data;
    if (Object.keys(patientData).length === 0) {
      throw new BadRequestError("At least one patient field must be provided");
    }

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

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    return patient;
  }

  listAll() {
    return patientRepo.listAll();
  }
}
