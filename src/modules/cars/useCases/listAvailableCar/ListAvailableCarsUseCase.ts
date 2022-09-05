import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

type RequestDTO = {
    category_id?: string;
    name?: string;
    brand?: string;
};

@injectable()
export class ListAvailableCarsUseCase {
    constructor(
        @inject("CarRepositories")
        private carRepositories: ICarRepository
    ) {}

    async execute({ brand, name, category_id }: RequestDTO): Promise<Car[]> {
        const cars = await this.carRepositories.findAvailable(
            brand,
            category_id,
            name
        );

        return cars;
    }
}
