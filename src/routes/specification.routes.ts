import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "../modules/cars/useCases/listSpecication/ListSpecificationController";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.post("/", createSpecificationController.handler);
specificationRoutes.get("/", listSpecificationController.handler);

export { specificationRoutes };
