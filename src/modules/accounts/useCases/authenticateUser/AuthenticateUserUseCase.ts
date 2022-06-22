import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AuthenticateErrors } from "@shared/errors/AuthenticateErrors";

type RequestDTO = {
    email: string;
    password: string;
};

type ResponseAuthenticationDTO = {
    name: string;
    email: string;
    token: string;
};

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepositories")
        private userRepositories: IUsersRepository
    ) {}

    async execute({
        email,
        password,
    }: RequestDTO): Promise<ResponseAuthenticationDTO> {
        const user = await this.userRepositories.findByEmail(email);

        if (!user) {
            throw new AuthenticateErrors("email or password incorrect");
        }

        const matchPassword = await compare(password, user.password);
        if (!matchPassword) {
            throw new AuthenticateErrors("email or password incorrect");
        }

        const privateKey = "56dd22008a79f327492b48256a28243d";

        const token = sign({}, privateKey, {
            subject: user.id,
            expiresIn: "1d",
            algorithm: "HS512",
        });

        const tokenResponse = {
            token,
            name: user.name,
            email: user.email,
        };

        return tokenResponse;
    }
}
