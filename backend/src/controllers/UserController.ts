import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export class UserController {
    private userService = new UserService();

    async create(req: Request, res: Response ) {
        const { name, email, password, cpf, phone, address, addressNumber, postalCode } = req.body;

        const user = await this.userService.createUser({ name, email, password, cpf, phone, address, addressNumber, postalCode, role: 2 });
        
        return res.status(201).json(user);
    }
}