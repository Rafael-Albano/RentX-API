import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateErrors } from "@shared/errors/AuthenticateErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);
        try {
            await createCarUseCase.execute({
                name,
                description,
                daily_rate,
                license_plate,
                fine_amount,
                brand,
                category_id,
            });
        } catch (err) {
            if (err instanceof AuthenticateErrors) {
                return response.status(401).json(`${err.message}`);
            }
            return response.status(400).json(`${err.message}`);
        }

        return response.status(201).send();
    }
}
