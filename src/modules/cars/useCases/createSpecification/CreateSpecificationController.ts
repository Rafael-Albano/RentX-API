import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    async handler(request: Request, response: Response): Promise<Response> {
        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );
        const { name, description } = request.body;
        try {
            await createSpecificationUseCase.execute({ description, name });
        } catch (err) {
            return response.status(500).json(`${err.message}`);
        }

        return response.status(201).send();
    }
}
