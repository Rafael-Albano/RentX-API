import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepositories } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { AuthenticateErrors } from "../../../errors/AuthenticateErrors";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AuthenticateErrors("Token missing");
    }

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(
            token,
            "56dd22008a79f327492b48256a28243d"
        ) as IPayload;
        const userRepository = new UsersRepositories();
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AuthenticateErrors("User does not exists");
        }

        request.user = {
            id: user_id,
        };
    } catch (err) {
        throw new AuthenticateErrors("Ivalid Token !");
    } finally {
        next();
    }
}
