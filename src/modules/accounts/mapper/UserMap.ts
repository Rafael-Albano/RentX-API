import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";

interface IUserResponseDTO {
    email: string;
    name: string;
    id: string;
    avatar: string;
    driver_license: string;
    avatar_url(): string;
}

export class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        });
        return user;
    }
}
