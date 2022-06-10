import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handler(request: Request, response: Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const { name, password, email, driver_license, avatar } = request.body;

        try {
            await createUserUseCase.execute({
                name,
                password,
                email,
                driver_license,
                avatar,
            });
        } catch (err) {
            return response.status(500).json(`${err.message}`);
        }

        return response.status(204).send();
    }
}
