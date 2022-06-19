import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUseCase = container.resolve(AuthenticateUserUseCase);

        try {
            const data = await authenticateUseCase.execute({ password, email });

            return response.status(200).json(data);
        } catch (err) {
            return response.status(401).json(`message: ${err.message}`);
        }
    }
}
