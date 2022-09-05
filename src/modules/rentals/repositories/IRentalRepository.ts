import { Rental } from "../infra/typeorm/entities/Rental";

export type CreateRentalDTO = {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
};
export interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data: CreateRentalDTO): Promise<Rental>;
}
