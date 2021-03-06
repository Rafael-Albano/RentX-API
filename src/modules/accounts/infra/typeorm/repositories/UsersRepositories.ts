import { getRepository, Repository } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
    IUsersRepository,
    ICreateUserDTO,
} from "@modules/accounts/repositories/IUsersRepository";

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
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
}
