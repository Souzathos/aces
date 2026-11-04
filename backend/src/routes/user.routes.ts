import { Router } from "express";
import { UserController } from "../controllers/UserController";


const userRoute = Router();
const userController = new UserController();

userRoute.post("/", userController.create.bind(userController));
userRoute.patch("/update/:id", userController.update.bind(userController));
userRoute.delete("/delete/:id", userController.delete.bind(userController));
userRoute.get("/:id", userController.listById.bind(userController));
userRoute.get("/", userController.listAll.bind(userController));

export default userRoute;