import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AuthenticateErrors } from "@shared/errors/AuthenticateErrors";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
export class ResetPasswordUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvide: IDateProvider,
        @inject("UsersRepositories")
        private userRepository: IUsersRepository
    ) {}
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        console.log(token);
        console.log(userToken);

        if (!userToken) {
            console.log(userToken);
            throw new AuthenticateErrors("Token Inválid");
        }

        const now = this.dateProvide.dateNow();

        if (this.dateProvide.compareIfBefore(userToken.expires_date, now)) {
            throw new AuthenticateErrors("Token expired");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.userRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}
