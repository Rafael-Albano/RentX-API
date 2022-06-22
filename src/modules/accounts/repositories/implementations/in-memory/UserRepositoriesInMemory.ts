import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
    ICreateUserDTO,
    IUsersRepository,
} from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepositoriesInMemory implements IUsersRepository {
    private users: Array<User>;

    constructor() {
        this.users = [];
    }

    async create({
        name,
        password,
        email,
        driver_license,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {
            name,
            password,
            email,
            driver_license,
            avatar,
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}
