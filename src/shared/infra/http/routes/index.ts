import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/v1/categories", categoriesRoutes);
router.use("/v1/specifications", specificationRoutes);
router.use("/v1/users", usersRoutes);
router.use("/v1", authenticateRoutes);
router.use("/v1/cars", carsRoutes);
router.use("/v1/rentals", rentalRoutes);
router.use("/v1/password", passwordRoutes);

export { router };
