import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { RentalError } from "@shared/errors/RentalError";

interface IRequest {
    id: string;
    user_id: string;
}
@injectable()
export class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarRepositories")
        private carsRepository: ICarRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        console.log("Estou no use Case !");
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);

        const minimum_daily = 1;

        if (!rental) {
            throw new RentalError("Rental does not exists !");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if (daily <= 0) {
            daily = minimum_daily;
        }

        let total = 0;

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}
