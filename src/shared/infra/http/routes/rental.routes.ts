import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handler);
rentalRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handler
);
rentalRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalRoutes };
