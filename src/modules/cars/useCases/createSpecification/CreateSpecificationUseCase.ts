import { inject, injectable } from "tsyringe";

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
        await this.specificationRepository.create({ description, name });
    }
}
