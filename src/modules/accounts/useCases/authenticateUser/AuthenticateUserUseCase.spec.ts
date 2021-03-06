import { UsersRepositoriesInMemory } from "@modules/accounts/repositories/implementations/in-memory/UserRepositoriesInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateErrors } from "@shared/errors/AuthenticateErrors";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoriesInMemory: UsersRepositoriesInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
const loginTest = {
    name: "John Doe",
    password: "@John.Doe1234",
    email: "john.doe@ignite.com",
    driver_license: "99999",
    avatar: null,
};

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoriesInMemory = new UsersRepositoriesInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoriesInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoriesInMemory);
    });

    it("Should be able to generate token authentication for user", async () => {
        const { email, password } = loginTest;
        await createUserUseCase.execute(loginTest);
        const result = await authenticateUserUseCase.execute({
            email,
            password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "jane.doe@ignite.com",
                password: loginTest.password,
            });
        }).rejects.toBeInstanceOf(AuthenticateErrors);
    });

    it("Should not be able to authenticate an user with passworld incorrect", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: loginTest.email,
                password: "passworldIncorrect",
            });
        }).rejects.toBeInstanceOf(AuthenticateErrors);
    });
});
