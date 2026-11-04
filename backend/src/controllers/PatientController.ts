import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { CreatePatientData, UpdatePatientData } from "../repositories/PatientRepo";
import { PatientService } from "../services/PatientService";

type PatientParams = { cpf: string };

export class PatientController {
  private patientService = new PatientService();

  async create(req: Request<unknown, unknown, CreatePatientData>, res: Response) {
    const { cpf, bloodType } = req.body ?? {};

    if (typeof cpf !== "string" || cpf.trim().length === 0) {
      throw new BadRequestError("Patient CPF is required");
    }
    if (bloodType !== undefined && bloodType !== null && typeof bloodType !== "string") {
      throw new BadRequestError("Invalid patient blood type");
    }

    const patient = await this.patientService.create({
      cpf: cpf.trim(),
      bloodType,
    });

    return res.status(201).json(patient);
  }

  async update(
    req: Request<PatientParams, unknown, UpdatePatientData>,
    res: Response,
  ) {
    const cpf = req.params.cpf?.trim();
    if (!cpf) {
      throw new BadRequestError("Invalid patient CPF");
    }

    const { bloodType } = req.body ?? {};
    if (bloodType !== undefined && bloodType !== null && typeof bloodType !== "string") {
      throw new BadRequestError("Invalid patient blood type");
    }
    if (bloodType === undefined) {
      throw new BadRequestError("At least one patient field must be provided");
    }

    const patient = await this.patientService.update(cpf, { bloodType });
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