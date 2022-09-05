import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecication/ListSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthentication";

import { ensureAdministrator } from "../middlewares/ensureAdministrator";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdministrator,
    createSpecificationController.handler
);
specificationRoutes.get("/", listSpecificationController.handler);

export { specificationRoutes };
