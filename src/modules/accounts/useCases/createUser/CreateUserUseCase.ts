import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

type RequestDTO = {
    name: string;
    password: string;
    email: string;
    driver_license: string;
    avatar: string;
};

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepositories")
        private userRepositories: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
        avatar,
    }: RequestDTO): Promise<void> {
        if (await this.userRepositories.findByEmail(email)) {
            throw new Error("User Already Exists !");
        }

        const passwordEncript = await hash(password, 10);

        await this.userRepositories.create({
            name,
            password: passwordEncript,
            email,
            driver_license,
            avatar,
        });
    }
}
