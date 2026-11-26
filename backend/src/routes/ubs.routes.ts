import { Router } from "express";
import { UbsController } from "../controllers/UbsController";

const ubsRoute = Router();
const ubsController = new UbsController();

ubsRoute.post("/create", ubsController.create.bind(ubsController));
ubsRoute.put("/update/:id", ubsController.update.bind(ubsController));
ubsRoute.delete("/delete/:id", ubsController.delete.bind(ubsController));
ubsRoute.post("/:ubsId/insert-doctor/:doctorId", ubsController.insertDoctor.bind(ubsController));

export default ubsRoute;