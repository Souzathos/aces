import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { CreatePatientData, UpdatePatientData } from "../repositories/PatientRepo";
import { PatientService } from "../services/PatientService";
import { userDTO } from "../repositories/UserRepo";

export class PatientController {
  private patientService = new PatientService();

  async create(req: Request, res: Response) {
    const { cpf, bloodType, user } = req.body;

    const patient = await this.patientService.create({
      cpf: cpf.trim(),
      bloodType,
    }, user as userDTO);

    return res.status(201).json(patient);
  }

  async update( req: Request,  res: Response) {
    const cpf  = (req.params.cpf as string).trim();

    const { bloodType } = req.body;

    const patient = await this.patientService.update(cpf, { bloodType });
    return res.status(200).json(patient);
  }

  async delete(req: Request, res: Response) {
    const cpf = (req.params.cpf as string).trim();

    await this.patientService.delete(cpf);
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
}