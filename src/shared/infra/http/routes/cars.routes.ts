import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAdministrator } from "@shared/infra/http/middlewares/ensureAdministrator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthentication";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdministrator,
    createCarController.handle
);

export { carsRoutes };
