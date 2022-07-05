import { Car } from "../infra/typeorm/entities/Cars";
import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
}

export interface ICarRepository {
    create(data: ICarDTO): Promise<void>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car>;
}
