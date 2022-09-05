import { SpecificationErrors } from "@shared/errors/SpecificationErrors";

import { SpecificationRepositoriesInMemory } from "../../repositories/implementations/in-memory/SpecificationRepositoriesInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let specificationRepositoriesInMemory: SpecificationRepositoriesInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;
const specificationMock = {
    id: "12345",
    name: "specification name",
    description: "specification description",
};

describe("Create Specication", () => {
    beforeEach(() => {
        specificationRepositoriesInMemory =
            new SpecificationRepositoriesInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(
            specificationRepositoriesInMemory
        );
    });

    it("Should be able to create specification", async () => {
        const { name, description } = specificationMock;

        await createSpecificationUseCase.execute({ name, description });

        const specification =
            await specificationRepositoriesInMemory.findByName(name);
        expect(specification).toHaveProperty("id");
    });

    it("Should not be able create a new specification with name already exists", async () => {
        expect(async () => {
            const { name, description } = specificationMock;

            await createSpecificationUseCase.execute({ name, description });

            await createSpecificationUseCase.execute({ name, description });
        }).rejects.toBeInstanceOf(SpecificationErrors);
    });
});
