import { container } from "tsyringe";

import { UsersRepositories } from "../../modules/accounts/repositories/implementations/UsersRepositories";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { CategoriesRepositories } from "../../modules/cars/repositories/implementations/CategoryRepositories";
import { SpecificationRepositories } from "../../modules/cars/repositories/implementations/SpecificationRepositories";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoriesRepositories",
    CategoriesRepositories
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepositories",
    SpecificationRepositories
);

container.registerSingleton<IUsersRepository>(
    "UsersRepositories",
    UsersRepositories
);
