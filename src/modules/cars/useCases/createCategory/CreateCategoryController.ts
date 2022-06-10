import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        try {
            await createCategoryUseCase.execute({ name, description });
        } catch (err) {
            return response.status(500).json(`${err.message}`);
        }

        return response.status(201).send();
    }
}
