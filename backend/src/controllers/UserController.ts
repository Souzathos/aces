import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { UserService, UpdateUserData } from "../services/UserService";


export class UserController {
    private userService = new UserService();

    async create(req: Request, res: Response ) {
        const { name, email, password, cpf, phone, address, addressNumber, postalCode } = req.body ?? {};

        const user = await this.userService.createUser({ name, email, password, cpf, phone, address, addressNumber, postalCode, role: 2 });
        
        return res.status(201).json(user);
    }

    async update(req: Request<{ id: string }, unknown, UpdateUserData>, res: Response) {
        const id = Number(req.params.id);

        if (!req.params.id || !Number.isInteger(id)) {
            throw new BadRequestError("Invalid user id");
        }

        const { name, email, password, cpf, phone, address, addressNumber, postalCode } = req.body;
        const userData: UpdateUserData = {};

        if (name !== undefined) userData.name = name;
        if (email !== undefined) userData.email = email;
        if (password !== undefined) userData.password = password;
        if (cpf !== undefined) userData.cpf = cpf;
        if (phone !== undefined) userData.phone = phone;
        if (address !== undefined) userData.address = address;
        if (addressNumber !== undefined) userData.addressNumber = addressNumber;
        if (postalCode !== undefined) userData.postalCode = postalCode;

        if (Object.keys(userData).length === 0) {
            throw new BadRequestError("At least one user field must be provided");
        }

        const user = await this.userService.update(id, userData);

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