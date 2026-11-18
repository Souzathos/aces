import { Request, Response } from "express";
import { DoctorService } from "../services/DoctorService";
import { CreateUserDTOType } from "../dtos/user";
import { User } from "../models/User";

export class DoctorController {
  private doctorService = new DoctorService();

  async create(req: Request, res: Response) {
    const { crm, specialty, ubs, user } = req.body;

    const doctor = await this.doctorService.create({
      crm: crm.trim(),
      specialty,
      ubs
    }, user as User);

    return res.status(201).json(doctor);
  }

}