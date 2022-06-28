import { Car } from "../infra/typeorm/entities/Cars";

export interface ICarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

export interface ICarRepository {
    create(data: ICarDTO): Promise<void>;
    findByLicensePlate(license_plate: string): Promise<Car>;
}
