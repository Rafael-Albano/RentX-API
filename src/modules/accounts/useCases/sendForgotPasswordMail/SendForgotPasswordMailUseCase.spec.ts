import { UsersRepositoriesInMemory } from "@modules/accounts/repositories/implementations/in-memory/UserRepositoriesInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/implementations/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoriesInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoriesInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await usersRepositoryInMemory.create({
            driver_license: "966326",
            name: "Vincent Osborne",
            email: "gakize@guugunem.tr",
            password: "Vincent@2022",
        });

        await sendForgotPasswordMailUseCase.execute("gakize@guugunem.tr");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("wijkoc@kab.ad")
        ).rejects.toEqual(new Error("User does not exists"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");
        await usersRepositoryInMemory.create({
            driver_license: "605055",
            name: "Lloyd Bennett",
            email: "zutvuc@wusolfa.il",
            password: "zutv*90@20",
        });

        await sendForgotPasswordMailUseCase.execute("zutvuc@wusolfa.il");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
