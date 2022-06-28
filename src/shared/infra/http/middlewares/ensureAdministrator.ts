import { Request, Response, NextFunction } from "express";

import { UsersRepositories } from "@modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { AuthenticateErrors } from "@shared/errors/AuthenticateErrors";

export async function ensureAdministrator(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.user;
    const userRepositories = new UsersRepositories();

    const user = await userRepositories.findById(id);

    if (!user.isAdmin) {
        throw new AuthenticateErrors("No admin permission");
    }

    next();
}
