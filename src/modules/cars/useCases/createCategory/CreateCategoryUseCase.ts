import { inject, injectable } from "tsyringe";

import { CategoryErrors } from "../../../../errors/CategoryErrors";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

type RequestDTO = {
    name: string;
    description: string;
};

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepositories")
        private categoryRepositories: ICategoryRepository
    ) {}

    async execute({ name, description }: RequestDTO): Promise<void> {
        if (await this.categoryRepositories.findByName(name)) {
            throw new CategoryErrors("Category Already Exists!");
        }

        await this.categoryRepositories.create({ description, name });
    }
}
