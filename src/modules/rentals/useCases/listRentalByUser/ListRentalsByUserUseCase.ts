import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";

@injectable()
export class ListRentalByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

        return rentalsByUser;
    }
}
