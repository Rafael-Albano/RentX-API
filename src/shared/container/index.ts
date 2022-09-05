import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepositories } from "@modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarRepositories } from "@modules/cars/infra/typeorm/repositories/CarRepositories";
import { CategoriesRepositories } from "@modules/cars/infra/typeorm/repositories/CategoryRepositories";
import { SpecificationRepositories } from "@modules/cars/infra/typeorm/repositories/SpecificationRepositories";
import { UploadImageCarRepositories } from "@modules/cars/infra/typeorm/repositories/UploadImageCarRepositories";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { IUploadImageCarRepository } from "@modules/cars/repositories/IUploadImageCarRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";

import { ICarRepository } from "../../modules/cars/repositories/ICarRepository";

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

container.registerSingleton<IUploadImageCarRepository>(
    "UploadImageCarRepositories",
    UploadImageCarRepositories
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);
