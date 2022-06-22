import { UsersRepositoriesInMemory } from "@modules/accounts/repositories/implementations/in-memory/UserRepositoriesInMemory";

import { CreateUserUseCase } from "./CreateUserUseCase";

const userTest = {
    name: "John Doe",
    password: "@John.Doe1234",
    email: "john.doe@ignite.com",
    driver_license: "99999",
    avatar: null,
};

let usersRepositoriesInMemory: UsersRepositoriesInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
    beforeEach(() => {
        usersRepositoriesInMemory = new UsersRepositoriesInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoriesInMemory);
    });

    it("Should be able create user", async () => {
        await createUserUseCase.execute(userTest);

        const user = await usersRepositoriesInMemory.findByEmail(
            userTest.email
        );

        expect(user).toHaveProperty("id");
    });

    it("Should not be able create user if email already exists", async () => {
        expect(async () => {
            await createUserUseCase.execute(userTest);

            await createUserUseCase.execute(userTest);
        }).rejects.toBeInstanceOf(Error);
    });
});
