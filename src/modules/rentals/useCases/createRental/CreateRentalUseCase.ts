import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import {
    CreateRentalDTO,
    IRentalsRepository,
} from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { RentalError } from "@shared/errors/RentalError";

@injectable()
export class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarRepositories")
        private carRepositories: ICarRepository
    ) {}
    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: CreateRentalDTO): Promise<Rental> {
        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        const minimumHour = 24;
        const available = false;

        if (compare < minimumHour) {
            throw new RentalError("Invalid return time!");
        }

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new RentalError("Car is unavailable");
        }

        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new RentalError("User is unavailable");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carRepositories.updateAvailable(car_id, available);

        return rental;
    }
}
