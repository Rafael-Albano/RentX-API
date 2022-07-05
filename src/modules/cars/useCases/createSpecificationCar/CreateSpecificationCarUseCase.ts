import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepositories";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { CarErrors } from "@shared/errors/CarErros";

import { SpecificationCarDTO } from "./dto/SpecificationCarDTO";

@injectable()
export class CreateSpecificationCarUseCase {
    constructor(
        @inject("CarRepositories")
        private carRepositories: ICarRepository,
        @inject("SpecificationRepositories")
        private specificationRepositories: ISpecificationRepository
    ) {}
    async execute({
        car_id,
        specification_id,
    }: SpecificationCarDTO): Promise<void> {
        const carExists = await this.carRepositories.findById(car_id);

        const specifications = await this.specificationRepositories.findByIds(
            specification_id
        );

        if (!carExists) {
            throw new CarErrors("Car does not exists");
        }

        carExists.specifications = specifications;

        await this.carRepositories.create(carExists);
    }
}
