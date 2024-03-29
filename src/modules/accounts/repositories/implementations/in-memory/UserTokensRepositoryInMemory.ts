import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import {
    ICreateUserTokenDTO,
    IUsersTokensRepository,
} from "@modules/accounts/repositories/IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    usersTokens: UserTokens[] = [];

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.usersTokens.push(userToken);

        return userToken;
    }
    async findByUserIdAndRefreshToken(
        user_id: string,
        token: string
    ): Promise<UserTokens> {
        const userToken = await this.usersTokens.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === token
        );

        return userToken;
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find(
            (userToken) => userToken.id === id
        );
        this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find(
            (userToken) => userToken.refresh_token === refresh_token
        );

        return userToken;
    }
}
