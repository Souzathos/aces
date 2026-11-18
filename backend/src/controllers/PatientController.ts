import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { PatientService } from "../services/PatientService";
import { CreateUserDTOType } from "../dtos/user";
import { User } from "../models/User";

export class PatientController {
  private patientService = new PatientService();

  async create(req: Request, res: Response) {
    const { cpf, bloodType, user } = req.body;

    const patient = await this.patientService.create({
      cpf: cpf.trim(),
      bloodType,
    }, user);

    return res.status(201).json(patient);
  }

  async update(req: Request<PatientParams>, res: Response) {
    const cpf = req.params.cpf?.trim();
    if (!cpf) {
      throw new BadRequestError("Invalid patient CPF");
    }

    const patient = await this.patientService.update(cpf, req.body);
    return res.status(200).json(patient);
  }

  async delete(req: Request<PatientParams>, res: Response) {
    const cpf = req.params.cpf?.trim();
    if (!cpf) {
      throw new BadRequestError("Invalid patient CPF");
    }

    await this.patientService.delete(cpf);
    return res.status(204).send();
  }

  async listByCpf(req: Request<PatientParams>, res: Response) {
    const cpf = req.params.cpf?.trim();
    if (!cpf) {
      throw new BadRequestError("Invalid patient CPF");
    }

    const patient = await this.patientService.listByCpf(cpf);
    return res.status(200).json(patient);
  }

  async listAll(_req: Request, res: Response) {
    const patients = await this.patientService.listAll();
    return res.status(200).json(patients);
  }
}
