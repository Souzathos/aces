import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { generateToken } from "../utils/TokenUtils";
import { User } from "../models/User";


export class AuthController {
    private authService = new AuthService();

    async login(req: Request, res: Response) {
        const user: User = await this.authService.login(req.body);

        const payload = {
            userId: Number(user.id),
            email: user.email,
            role: user.role.toString()
        }

        const token = await generateToken(payload)

        return res.status(200).json({
            user,
            token
        })
    }
}