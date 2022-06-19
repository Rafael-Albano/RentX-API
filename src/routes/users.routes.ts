import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthentication";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/cars/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handler);
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handler
);

export { usersRoutes };
