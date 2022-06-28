import { container } from "tsyringe";

import { UsersRepositories } from "@modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarRepositories } from "@modules/cars/infra/typeorm/repositories/CarRepositories";
import { CategoriesRepositories } from "@modules/cars/infra/typeorm/repositories/CategoryRepositories";
import { SpecificationRepositories } from "@modules/cars/infra/typeorm/repositories/SpecificationRepositories";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

import { ICarRepository } from "../../modules/cars/repositories/ICarRepositories";

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

container.registerSingleton<ICarRepository>("CarRepositories", CarRepositories);
