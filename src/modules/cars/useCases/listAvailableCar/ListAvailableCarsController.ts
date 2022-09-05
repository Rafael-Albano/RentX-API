import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {
    async handler(request: Request, response: Response): Promise<Response> {
        const listCarUseCase = container.resolve(ListAvailableCarsUseCase);
        const { brand, category_id, name } = request.query;
        return response.json(
            await listCarUseCase.execute({
                name: <string>name, // Fazendo type cast
                brand: brand as string, // Outra forma de fazer type cast.
                category_id: category_id as string,
            })
        );
    }
}
