import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

type RequestDTO = {
    user_id: string;
    avatar_file: string;
};

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepositories")
        private usersRepositories: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}
    async execute({ avatar_file, user_id }: RequestDTO): Promise<void> {
        const user = await this.usersRepositories.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        await this.storageProvider.save(avatar_file, "avatar");

        user.avatar = avatar_file;

        await this.usersRepositories.create(user);
    }
}
