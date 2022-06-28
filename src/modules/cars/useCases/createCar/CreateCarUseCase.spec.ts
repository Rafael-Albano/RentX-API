import { CarErrors } from "@shared/errors/CarErros";

import { CarRepositoriesInMemory } from "../../repositories/implementations/in-memory/CarRepositoriesInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

const carTest = {
    name: "nameCar",
    description: "descriptionCar",
    daily_rate: 24,
    license_plate: "ABC-1234",
    fine_amount: 350.0,
    brand: "brandCar",
};
let createCarUseCase: CreateCarUseCase;
let carRepositoriesInMemory: CarRepositoriesInMemory;

describe("Create a new Car", () => {
    beforeEach(() => {
        carRepositoriesInMemory = new CarRepositoriesInMemory();
        createCarUseCase = new CreateCarUseCase(carRepositoriesInMemory);
    });

    it("Should be able to create a car", async () => {
        await createCarUseCase.execute(carTest);

        const car = await carRepositoriesInMemory.findByLicensePlate(
            carTest.license_plate
        );

        expect(car).toHaveProperty("id");
    });

    it("Should not be to create a new car with same license_plate", async () => {
        expect(async () => {
            await createCarUseCase.execute(carTest);

            await createCarUseCase.execute(carTest);
        }).rejects.toBeInstanceOf(CarErrors);
    });

    it("Must be able to create cars with available status", async () => {
        await createCarUseCase.execute(carTest);

        const car = await carRepositoriesInMemory.findByLicensePlate(
            carTest.license_plate
        );

        expect(car.available).toBe(true);
    });
});
