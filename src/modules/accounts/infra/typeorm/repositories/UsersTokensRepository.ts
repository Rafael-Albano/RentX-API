import { getRepository, Repository } from "typeorm";

import {
    ICreateUserTokenDTO,
    IUsersTokensRepository,
} from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const usersTokens = await this.repository.findOne({
            user_id,
            refresh_token,
        });

        return usersTokens;
    }

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = await this.repository.create({
            user_id,
            expires_date,
            refresh_token,
        });

        this.repository.save(userToken);

        return userToken;
    }
}
