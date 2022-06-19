import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import "./database";
import "./shared/container";
import "express-async-errors";

import { AuthenticateErrors } from "./errors/AuthenticateErrors";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
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

app.listen(3333, () => console.log("Listening on port 3333"));
