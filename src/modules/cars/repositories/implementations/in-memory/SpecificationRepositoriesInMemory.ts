import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

export class SpecificationRepositoriesInMemory
    implements ISpecificationRepository
{
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    async findByname(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
        });
        this.specifications.push(specification);
    }
    async list(): Promise<Specification[]> {
        return this.specifications;
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );

        return specifications;
    }
}
