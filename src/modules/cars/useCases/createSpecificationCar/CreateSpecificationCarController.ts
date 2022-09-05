import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationCarUseCase } from "./CreateSpecificationCarUseCase";

export class CreateSpecificationCarController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specification_id } = request.body;
        const createSpecificationUseCase = container.resolve(
            CreateSpecificationCarUseCase
        );

        await createSpecificationUseCase.execute({
            car_id: id,
            specification_id,
        });

        return response.status(204).send();
    }
}
