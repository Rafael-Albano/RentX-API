import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

type RequestDTO = {
    user_id: string;
    avatar_file: string;
};

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepositories")
        private usersRepositories: IUsersRepository
    ) {}
    async execute({ avatar_file, user_id }: RequestDTO): Promise<void> {
        const user = await this.usersRepositories.findById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.usersRepositories.create(user);
    }
}

// Configurar upload multer.
// Criar Controller.
