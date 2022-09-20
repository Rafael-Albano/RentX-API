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
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.repository.findOne({ where: { refresh_token } });

        return userToken;
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

        console.log("nem cai aqui porra !");
        console.log(user_id);
        console.log(expires_date);
        console.log(refresh_token);
        this.repository.save(userToken);

        console.log(userToken);
        return userToken;
    }
}
