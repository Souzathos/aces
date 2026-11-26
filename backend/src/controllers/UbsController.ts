import { Request, Response } from "express";
import { UbsService } from "../services/UbsService";

export class UbsController {
    private ubsService = new UbsService();

    async create(req: Request, res: Response) {
       const ubs = await this.ubsService.createUbs(req.body);

       return res.status(201).json(ubs);
    }

    async update(req: Request, res:Response) {
        const id = req.params.id;
        const ubs = await this.ubsService.updateUbs(Number(id), req.body);

        return res.status(200).json(ubs);
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        const result = await this.ubsService.deleteUbs(Number(id));

        return res.status(200).json(result);
    }

    async insertDoctor(req: Request, res: Response) {
        const ubsId = Number(req.params.ubsId);
        const doctorId = Number(req.params.doctorId);

        const result = await this.ubsService.insertDoctor(ubsId, doctorId);

        return res.status(200).json(result);
    }
}