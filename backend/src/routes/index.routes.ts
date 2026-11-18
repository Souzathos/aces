import { Router } from "express";
import patientRoute from "./patient.routes";
import userRoute from "./user.routes";
import doctorRoute from "./doctor.routes";

const route = Router();

route.use("/users", userRoute);
route.use("/patients", patientRoute);
route.use("/doctor", doctorRoute);

export default route;