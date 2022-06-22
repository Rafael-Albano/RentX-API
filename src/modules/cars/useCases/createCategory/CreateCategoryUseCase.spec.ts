import { CategoryRepositoriesInMemory } from "@modules/cars/repositories/implementations/in-memory/CategoryRepositoriesInMemory";
import { CategoryErrors } from "@shared/errors/CategoryErrors";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
// describe("Create category", () => {
//     it("should be 2 + 2 equals 4", () => {
//         const sum = 2 + 2;
//         const result = 4;

//         expect(sum).toBe(result);
//     });

//     it("should not be 2 + 2 equals 5", () => {
//         const sum = 2 + 2;
//         const result = 5;

//         expect(sum).not.toBe(result);
//     });
// });
const categoryTest = {
    name: "Category Test",
    description: "Description category Test",
};

let categoryRepositoriesInMemory: CategoryRepositoriesInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
    beforeEach(() => {
        categoryRepositoriesInMemory = new CategoryRepositoriesInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoryRepositoriesInMemory
        );
    });

    it("Should be able create a new category", async () => {
        await createCategoryUseCase.execute(categoryTest);

        const category = await categoryRepositoriesInMemory.findByName(
            categoryTest.name
        );

        expect(category).toHaveProperty("id");
    });

    it("It should not be able create new category that name already exists", async () => {
        expect(async () => {
            await createCategoryUseCase.execute(categoryTest);

            await createCategoryUseCase.execute(categoryTest);
        }).rejects.toBeInstanceOf(CategoryErrors);
    });
});
