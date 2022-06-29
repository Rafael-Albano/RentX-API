import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCar/ListAvailableCarsController";
import { ensureAdministrator } from "@shared/infra/http/middlewares/ensureAdministrator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthentication";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarController = new ListAvailableCarsController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdministrator,
    createCarController.handle
);

carsRoutes.get("/available", listCarController.handler);

export { carsRoutes };
