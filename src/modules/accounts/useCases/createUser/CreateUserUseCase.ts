import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

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
        const passwordEncript = await hash(password, 10);

        if (await this.userRepositories.findByEmail(email)) {
            throw new Error("User Already Exists !");
        }

        await this.userRepositories.create({
            name,
            password: passwordEncript,
            email,
            driver_license,
            avatar,
        });
    }
}
