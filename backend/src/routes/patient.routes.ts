import { Router } from "express";
import { PatientController } from "../controllers/PatientController";

const patientRoute = Router();
const patientController = new PatientController();

patientRoute.post("/", patientController.create.bind(patientController));
patientRoute.patch("/update/:cpf", patientController.update.bind(patientController));
patientRoute.delete("/delete/:cpf", patientController.delete.bind(patientController));
patientRoute.get("/:cpf", patientController.listByCpf.bind(patientController));
patientRoute.get("/", patientController.listAll.bind(patientController));

export default patientRoute;