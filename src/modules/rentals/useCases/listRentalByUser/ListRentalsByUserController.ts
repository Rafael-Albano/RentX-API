import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalByUserUseCase } from "./ListRentalsByUserUseCase";

export class ListRentalsByUserController {
    async handle(request: Request, response): Promise<Response> {
        const { id } = request.user;

        const listRentalsByUserUseCase = container.resolve(
            ListRentalByUserUseCase
        );

        const rentals = await listRentalsByUserUseCase.execute(id);

        return response.status(200).json(rentals);
    }
}
