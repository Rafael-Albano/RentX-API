import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarDTO, ICarRepository } from "../../ICarRepositories";

export class CarRepositoriesInMemory implements ICarRepository {
    private cars: Array<Car>;

    constructor() {
        this.cars = [];
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async create(data: ICarDTO): Promise<void> {
        const car = new Car();
        Object.assign(car, data);
        this.cars.push(car);
    }
}
