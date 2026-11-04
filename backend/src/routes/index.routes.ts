import { Router } from "express";
import patientRoute from "./patient.routes";
import userRoute from "./user.routes";

const route = Router();

route.use("/users", userRoute);
route.use("/patients", patientRoute);

export default route;