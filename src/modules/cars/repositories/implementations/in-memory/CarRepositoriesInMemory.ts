import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarDTO, ICarRepository } from "../../ICarRepository";

export class CarRepositoriesInMemory implements ICarRepository {
    private cars: Array<Car>;

    constructor() {
        this.cars = [];
    }

    async create(data: ICarDTO): Promise<void> {
        const car = new Car();
        Object.assign(car, data);
        this.cars.push(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        return this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }

            return null;
        });
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }
}
