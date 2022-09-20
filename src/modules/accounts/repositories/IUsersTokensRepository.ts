import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface ICreateUserTokenDTO {
    user_id: string;
    expires_date: Date;
    refresh_token: string;
}

export interface IUsersTokensRepository {
    create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens>;

    findByUserIdAndRefreshToken(
        user_id: string,
        token: string
    ): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;

    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
