import { Router } from "express";
import patientRoute from "./patient.routes";
import userRoute from "./user.routes";
import doctorRoute from "./doctor.routes";
import authRoute from "./auth.routes";
import ubsRoute from "./ubs.routes";

const route = Router();

route.use("/users", userRoute);
route.use("/auth", authRoute);
route.use("/patients", patientRoute);
route.use("/doctor", doctorRoute);
route.use("/ubs", ubsRoute);

export default route;
