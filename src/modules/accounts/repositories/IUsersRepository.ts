import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driver_license: string;
    id?: string;
    avatar?: string;
}

interface IUsersRepository {
    create({
        name,
        password,
        email,
        driver_license,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void>;

    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
