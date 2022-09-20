import { inject, injectable } from "tsyringe";

import { IUploadImageCarRepository } from "@modules/cars/repositories/IUploadImageCarRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

type RequestDTO = {
    car_id: string;
    images_name: string[];
};

@injectable()
export class UploadImageUseCase {
    constructor(
        @inject("UploadImageCarRepositories")
        private uploadImageCarRepository: IUploadImageCarRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ images_name, car_id }: RequestDTO): Promise<void> {
        images_name.map(async (image_name) => {
            await this.uploadImageCarRepository.create({ car_id, image_name });
            await this.storageProvider.save(image_name, "cars");
        });
    }
}
