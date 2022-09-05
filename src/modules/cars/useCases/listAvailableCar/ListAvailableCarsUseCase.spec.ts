import { CarRepositoriesInMemory } from "../../repositories/implementations/in-memory/CarRepositoriesInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carRepositoriesInMemory: CarRepositoriesInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
const carOne = {
    name: "One",
    description: "descriptionCarOne",
    daily_rate: 24,
    license_plate: "ONE-1234",
    fine_amount: 350.0,
    brand: "brandCarOne",
    category_id: "123456",
};

describe("List Cars", () => {
    beforeEach(() => {
        carRepositoriesInMemory = new CarRepositoriesInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carRepositoriesInMemory
        );
    });

    it("Should be able to find all available cars", async () => {
        await carRepositoriesInMemory.create(carOne);

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toHaveLength(1);
    });

    it("Should be able to find all available car by brand", async () => {
        await carRepositoriesInMemory.create(carOne);

        const cars = await listAvailableCarsUseCase.execute({
            brand: "brandCarOne",
        });
        expect(cars).toHaveLength(1);
    });

    it("Should be able to find all available car by category", async () => {
        await carRepositoriesInMemory.create(carOne);

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "123456",
        });
        expect(cars).toHaveLength(1);
    });

    it("Should be able to find all available car by name", async () => {
        await carRepositoriesInMemory.create(carOne);

        const cars = await listAvailableCarsUseCase.execute({
            name: "One",
        });
        expect(cars).toHaveLength(1);
    });
});
