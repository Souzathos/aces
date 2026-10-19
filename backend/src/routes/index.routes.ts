import { Router } from "express";
import userRoute from "./user.routes";

const route = Router();

route.use("/users", userRoute);

export default route;