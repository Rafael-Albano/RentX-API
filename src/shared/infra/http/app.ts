import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import "@shared/container";
import "express-async-errors";

import upload from "@config/upload";
import { AuthenticateErrors } from "@shared/errors/AuthenticateErrors";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";

createConnection();
const app = express();
app.use(express.json());

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tmpFolder}/cars`));
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        switch (error.constructor) {
            case AuthenticateErrors:
                return response
                    .status(401)
                    .json({ message: `${error.message}` });
                break;
            default:
                return response
                    .status(500)
                    .json({ message: `${error.message}` });
        }
        next();
    }
);

export { app };
