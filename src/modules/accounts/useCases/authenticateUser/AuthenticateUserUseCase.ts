import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AuthenticateErrors } from "@shared/errors/AuthenticateErrors";

type RequestDTO = {
    email: string;
    password: string;
};

type ResponseAuthenticationDTO = {
    refresh_token: string;
    token: string;
    user: {
        name: string;
        email: string;
    };
};

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepositories")
        private userRepositories: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
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

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token,
            algorithm: "HS512",
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token,
            algorithm: "HS512",
        });

        const refresh_token_expires_date = this.dayjsDateProvider.addDays(
            auth.expires_in_refresh_token_days
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        const tokenResponse: ResponseAuthenticationDTO = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token,
        };

        return tokenResponse;
    }
}
