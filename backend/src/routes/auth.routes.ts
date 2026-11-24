import { AuthController } from './../controllers/AuthController';
import { Router } from "express";


const authRoute = Router();
const authController = new AuthController();

authRoute.post("/", authController.login.bind(authController))

export default authRoute;