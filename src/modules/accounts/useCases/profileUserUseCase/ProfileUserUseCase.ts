import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IUserResponseDTO {
    email: string;
    name: string;
    id: string;
    avatar: string;
    driver_license: string;
    avatar_url(): string;
}
@injectable()
export class ProfileUserUseCase {
    constructor(
        @inject("UsersRepositories")
        private usersRepository: IUsersRepository
    ) {}
    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);

        return UserMap.toDTO(user);
    }
}
