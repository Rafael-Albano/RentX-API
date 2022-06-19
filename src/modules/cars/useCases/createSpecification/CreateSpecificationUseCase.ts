import { inject, injectable } from "tsyringe";

import { SpecificationErrors } from "../../../../errors/SpecificationErrors";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

type RequestDTO = {
    name: string;
    description: string;
};

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepositories")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: RequestDTO): Promise<void> {
        if (await this.specificationRepository.findByname(name)) {
            throw new SpecificationErrors("Specification Already Exists");
        }
        await this.specificationRepository.create({ description, name });
    }
}
