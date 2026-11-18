import { Router } from "express";
import { DoctorController } from "../controllers/DoctorController";

const doctorRoute = Router();
const doctorController = new DoctorController();

doctorRoute.post("/", doctorController.create.bind(doctorController));
doctorRoute.patch("/update/:crm", doctorController.update.bind(doctorController));
doctorRoute.delete("/delete/:crm", doctorController.delete.bind(doctorController));
doctorRoute.get("/:crm", doctorController.listByCrm.bind(doctorController));
doctorRoute.get("/", doctorController.listAll.bind(doctorController));

export default doctorRoute;