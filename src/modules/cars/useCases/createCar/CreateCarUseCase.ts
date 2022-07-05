import { inject, injectable } from "tsyringe";

import { CarErrors } from "../../../../shared/errors/CarErros";
import { ICarRepository } from "../../repositories/ICarRepositories";

type CarDTO = {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
};

@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CarRepositories")
        private carRepositories: ICarRepository
    ) {}
    async execute(car: CarDTO): Promise<void> {
        const carAlreadyExists = await this.carRepositories.findByLicensePlate(
            car.license_plate
        );

        if (carAlreadyExists) {
            throw new CarErrors("Car already exists !");
        }

        await this.carRepositories.create(car);
    }
}
