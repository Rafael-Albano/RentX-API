import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

@injectable()
export class ListCategoryUseCase {
    constructor(
        @inject("CategoriesRepositories")
        private categoryRepositories: ICategoryRepository
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryRepositories.list();

        return categories;
    }
}
