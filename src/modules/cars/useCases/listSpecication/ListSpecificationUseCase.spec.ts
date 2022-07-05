import { SpecificationRepositoriesInMemory } from "@modules/cars/repositories/implementations/in-memory/SpecificationRepositoriesInMemory";

import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

let specificationRepositoriesInMemory: SpecificationRepositoriesInMemory;
let listSpecificationUseCase: ListSpecificationUseCase;
let createSpecificationUseCase: CreateSpecificationUseCase;
const request = {
    name: "specification name",
    description: "specification description",
};

describe("List specifications", () => {
    beforeEach(() => {
        specificationRepositoriesInMemory =
            new SpecificationRepositoriesInMemory();

        listSpecificationUseCase = new ListSpecificationUseCase(
            specificationRepositoriesInMemory
        );

        createSpecificationUseCase = new CreateSpecificationUseCase(
            specificationRepositoriesInMemory
        );
    });

    it("Should be able to list all specifications created", async () => {
        const { name, description } = request;

        await createSpecificationUseCase.execute({ name, description });

        const specifications = await listSpecificationUseCase.execute();

        expect(specifications).toHaveLength(1);
    });
});
