import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { UserService } from "../services/UserService";
import { UserRoles } from "../enums/UserRoles";


export class UserController {
    private userService = new UserService();

    async create(req: Request, res: Response) {
        const user = await this.userService.createUser({ ...req.body, role: UserRoles.USER });

        return res.status(201).json(user);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const id = Number(req.params.id);

        if (!req.params.id || !Number.isInteger(id)) {
            throw new BadRequestError("Invalid user id");
        }

        const user = await this.userService.update(id, req.body);

        return res.status(200).json(user);
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (!req.params.id || !Number.isInteger(id)) {
            throw new BadRequestError("Invalid user id");
        }

        await this.userService.delete(id);

        return res.status(204).send();
    }

    async listById(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (!req.params.id || !Number.isInteger(id)) {
            throw new BadRequestError("Invalid user id");
        }

        const user = await this.userService.listById(id);

        return res.status(200).json(user);
    }

    async listAll(req: Request, res: Response) {
        const users = await this.userService.listAll();

        return res.status(200).json(users);
    }
}