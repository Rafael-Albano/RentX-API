import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

export class UsersRepositories implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_license,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
}
