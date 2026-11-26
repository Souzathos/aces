import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { PatientService } from "../services/PatientService";
import { CreateUserDTOType } from "../dtos/user";
import { User } from "../models/User";
import { Patient } from "../models/Patient";

export class PatientController {
  private patientService = new PatientService();

  async create(req: Request, res: Response) {
    const patient = await this.patientService.create(req.body);

    return res.status(201).json(patient);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const patientData = req.body;

    const patient = await this.patientService.update(id, patientData);
    return res.status(200).json(patient);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await this.patientService.delete(id);
    return res.status(204).send();
  }

  async listByCpf(req: Request, res: Response) {
    const cpf = (req.params.cpf as string).trim();

    const patient = await this.patientService.listByCpf(cpf);
    return res.status(200).json(patient);
  }

  async listAll(_req: Request, res: Response) {
    const patients = await this.patientService.listAll();
    return res.status(200).json(patients);
  }

  async listById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const patient = await this.patientService.listById(id);
    return res.status(200).json(patient);
  }
}
