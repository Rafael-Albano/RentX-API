import dayjs from "dayjs";

import { RentalRepositoriesInMemory } from "@modules/rentals/repositories/implementation/RentalRepositoriesInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { RentalError } from "@shared/errors/RentalError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createCarRentalUseCase: CreateRentalUseCase;
let rentalRepository: IRentalsRepository;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalRepository = new RentalRepositoriesInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createCarRentalUseCase = new CreateRentalUseCase(
            rentalRepository,
            dayjsDateProvider
        );
    });

    it("Should be able create a new rental", async () => {
        const rental = await createCarRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able create a new rental if there is another open the same user", async () => {
        expect(async () => {
            await createCarRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });

            await createCarRentalUseCase.execute({
                user_id: "12345",
                car_id: "131313",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(RentalError);
    });

    it("Should not be able create a new rental if there is another open the same car", async () => {
        expect(async () => {
            await createCarRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });

            await createCarRentalUseCase.execute({
                user_id: "67892",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(RentalError);
    });

    it("Should not be able create a new rental with invalid return time", async () => {
        expect(async () => {
            await createCarRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(RentalError);
    });
});
