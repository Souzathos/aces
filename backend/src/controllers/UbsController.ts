import { Request, Response } from "express";
import { UbsService } from "../services/UbsService";

export class UbsController {
    private ubsService = new UbsService();

    async create(req: Request, res: Response) {
       const ubs = await this.ubsService.createUbs(req.body);

       return res.status(201).json(ubs);
    }


}