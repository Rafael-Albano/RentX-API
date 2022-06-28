import { getRepository, Repository } from "typeorm";

import {
    ICarDTO,
    ICarRepository,
} from "../../../repositories/ICarRepositories";
import { Car } from "../entities/Cars";

export class CarRepositories implements ICarRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car);
    }
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICarDTO): Promise<void> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        await this.repository.save(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }
}
