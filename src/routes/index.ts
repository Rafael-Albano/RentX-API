import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/v1/categories", categoriesRoutes);
router.use("/v1/specifications", specificationRoutes);
router.use("/v1/users", usersRoutes);

export { router };
