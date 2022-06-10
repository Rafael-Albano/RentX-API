import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationController {
    async handler(request: Request, response: Response): Promise<Response> {
        const specificationUseCase = container.resolve(
            ListSpecificationUseCase
        );

        return response.json(await specificationUseCase.execute());
    }
}
