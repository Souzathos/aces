import { Request, Response } from "express";
import { DoctorService } from "../services/DoctorService";
import { CreateUserDTOType } from "../dtos/user";
import { User } from "../models/User";

export class DoctorController {
  private doctorService = new DoctorService();

  async create(req: Request, res: Response) {
    const { crm, cpf, specialty, ubs } = req.body;

    const doctor = await this.doctorService.create({
      crm: crm.trim(),
      specialty,
      ubs,
      
    }, cpf);

    return res.status(201).json(doctor);
  }

  async update(req: Request, res: Response) {
    const { specialty, ubs } = req.body;
    const id = Number  (req.params.id);
    
    const doctor = await this.doctorService.update(
      id,
      {
        specialty,
        ubs
      }
    );
    
    return res.status(201).json(
      doctor
    );
  }

  async delete(req: Request, res: Response) {
    const crm = req.params.crm as string;
    
    await this.doctorService.delete(crm);
    
    return res.status(204);
  }

  async listAll(req: Request, res: Response) {
    const doctors = await this.doctorService.listAll();

    return res.status(200).json(
      doctors
    );
  }

  async listByCrm(req: Request, res: Response) {
    const crm = req.params.crm as string;

    const doctor = await this.doctorService.listByCrm(crm);

    return res.status(200).json(
      doctor
    );
  }
}