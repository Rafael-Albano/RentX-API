import { CarRepositoriesInMemory } from "@modules/cars/repositories/implementations/in-memory/CarRepositoriesInMemory";
import { SpecificationRepositoriesInMemory } from "@modules/cars/repositories/implementations/in-memory/SpecificationRepositoriesInMemory";
import { CarErrors } from "@shared/errors/CarErros";

import { CreateSpecificationCarUseCase } from "./CreateSpecificationCarUseCase";

let carRepositoriesInMemory: CarRepositoriesInMemory;
let createSpecificationCarUseCase: CreateSpecificationCarUseCase;
let specificationRepositoryInMemory: SpecificationRepositoriesInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carRepositoriesInMemory = new CarRepositoriesInMemory();
        specificationRepositoryInMemory =
            new SpecificationRepositoriesInMemory();
        createSpecificationCarUseCase = new CreateSpecificationCarUseCase(
            carRepositoriesInMemory,
            specificationRepositoryInMemory
        );
    });

    it("Should not be able to add specification to a now-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specification_id = ["56789"];

            await createSpecificationCarUseCase.execute({
                car_id,
                specification_id,
            });
        }).rejects.toThrow(CarErrors);
    });

    it("Should be able to add a new specification to the car", async () => {
        await carRepositoriesInMemory.create({
            name: "nameCar",
            description: "descriptionCar",
            daily_rate: 24,
            license_plate: "ABC-1234",
            fine_amount: 350.0,
            brand: "brandCar",
            category_id: "123456",
        });

        const car = await carRepositoriesInMemory.findByLicensePlate(
            "ABC-1234"
        );

        await specificationRepositoryInMemory.create({
            description: "Specification description",
            name: "Specification name",
        });

        const specification = await specificationRepositoryInMemory.findByname(
            "Specification name"
        );
        const specification_id = [specification.id];

        await createSpecificationCarUseCase.execute({
            car_id: car.id,
            specification_id,
        });

        console.log(car);
    });
});
