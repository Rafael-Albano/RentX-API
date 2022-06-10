import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
    async handler(request: Request, response: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);
        return response.json(await listCategoryUseCase.execute());
    }
}
