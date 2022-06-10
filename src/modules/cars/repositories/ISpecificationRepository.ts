import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    findByname(name: string): Promise<Specification>;
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    list(): Promise<Specification[]>;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
