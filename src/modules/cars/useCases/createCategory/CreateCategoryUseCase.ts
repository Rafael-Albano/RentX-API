import { inject, injectable } from "tsyringe";

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
            throw new Error("Category Already Exists !");
        }

        await this.categoryRepositories.create({ description, name });
    }
}
