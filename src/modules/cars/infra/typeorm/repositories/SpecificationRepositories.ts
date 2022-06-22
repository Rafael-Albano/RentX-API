import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

export class SpecificationRepositories implements ISpecificationRepository {
    private respository: Repository<Specification>;
    constructor() {
        this.respository = getRepository(Specification);
    }

    async findByname(name: string): Promise<Specification> {
        const specification = await this.respository.findOne({ name });
        return specification;
    }
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.respository.create({
            name,
            description,
        });
        await this.respository.save(specification);
    }
    async list(): Promise<Specification[]> {
        const specifications = await this.respository.find();
        return specifications;
    }
}
