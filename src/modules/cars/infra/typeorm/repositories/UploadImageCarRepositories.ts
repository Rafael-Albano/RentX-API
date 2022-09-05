import { getRepository, Repository } from "typeorm";

import {
    IUploadImageCarRepository,
    CreateUploadImageCarDTO,
} from "@modules/cars/repositories/IUploadImageCarRepository";

import { CarImage } from "../entities/CarImage";

export class UploadImageCarRepositories implements IUploadImageCarRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create({
        car_id,
        image_name,
    }: CreateUploadImageCarDTO): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }
}
