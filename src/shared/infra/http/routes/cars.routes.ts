import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateSpecificationCarController } from "@modules/cars/useCases/createSpecificationCar/CreateSpecificationCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCar/ListAvailableCarsController";
import { UploadImageController } from "@modules/cars/useCases/uploadCarImages/UploadImagesController";
import { ensureAdministrator } from "@shared/infra/http/middlewares/ensureAdministrator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthentication";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarController = new ListAvailableCarsController();
const createSpecificationCarController = new CreateSpecificationCarController();
const uploadImageController = new UploadImageController();
const upload = multer(uploadConfig);

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdministrator,
    createCarController.handle
);

carsRoutes.get("/available", listCarController.handler);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdministrator,
    createSpecificationCarController.handler
);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdministrator,
    upload.array("images"),
    uploadImageController.handler
);

export { carsRoutes };
