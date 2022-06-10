import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
export class ListSpecificationUseCase {
    constructor(
        @inject("SpecificationRepositories")
        private specificationRepository: ISpecificationRepository
    ) {}
    async execute(): Promise<Specification[]> {
        const specifications = await this.specificationRepository.list();
        return specifications;
    }
}
