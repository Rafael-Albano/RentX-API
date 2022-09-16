import dayjs from "dayjs";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { CarRepositoriesInMemory } from "@modules/cars/repositories/implementations/in-memory/CarRepositoriesInMemory";
import { RentalRepositoriesInMemory } from "@modules/rentals/repositories/implementation/RentalRepositoriesInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { RentalError } from "@shared/errors/RentalError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createCarRentalUseCase: CreateRentalUseCase;
let rentalRepository: IRentalsRepository;
let dayjsDateProvider: DayjsDateProvider;
let carRepository: ICarRepository;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(2, "day").toDate();
    beforeEach(() => {
        rentalRepository = new RentalRepositoriesInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carRepository = new CarRepositoriesInMemory();
        createCarRentalUseCase = new CreateRentalUseCase(
            rentalRepository,
            dayjsDateProvider,
            carRepository
        );
    });

    it("Should be able create a new rental", async () => {
        await carRepository.create({
            name: "Test",
            description: "Test Description",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "9876",
            brand: "brand test",
        });

        const car = await carRepository.findByLicensePlate("test");

        const rental = await createCarRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
        expect(car.available).toBe(false);
    });

    it("Should not be able create a new rental if there is another open the same user", async () => {
        await carRepository.create({
            name: "Test",
            description: "Test Description",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "9876",
            brand: "brand test",
        });

        const car = await carRepository.findByLicensePlate("test");

        await createCarRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createCarRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new RentalError("User is unavailable"));
    });

    it("Should not be able create a new rental if there is another open the same car", async () => {
        await carRepository.create({
            name: "Test",
            description: "Test Description",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "9876",
            brand: "brand test",
        });

        const car = await carRepository.findByLicensePlate("test");

        await createCarRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createCarRentalUseCase.execute({
                user_id: "67892",
                car_id: car.id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new RentalError("Car is unavailable"));
    });

    it("Should not be able create a new rental with invalid return time", async () => {
        await carRepository.create({
            name: "Test",
            description: "Test Description",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "9876",
            brand: "brand test",
        });

        const car = await carRepository.findByLicensePlate("test");

        await expect(
            createCarRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new RentalError("Invalid return time!"));
    });
});
