import { Category } from "@modules/cars/infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export interface ICategoryRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}
