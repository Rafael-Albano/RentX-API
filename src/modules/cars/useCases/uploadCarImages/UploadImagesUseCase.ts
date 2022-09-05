import { inject, injectable } from "tsyringe";

import { IUploadImageCarRepository } from "@modules/cars/repositories/IUploadImageCarRepository";

type RequestDTO = {
    car_id: string;
    images_name: string[];
};

@injectable()
export class UploadImageUseCase {
    constructor(
        @inject("UploadImageCarRepositories")
        private uploadImageCarRepository: IUploadImageCarRepository
    ) {}

    async execute({ images_name, car_id }: RequestDTO): Promise<void> {
        images_name.map(async (image_name) =>
            this.uploadImageCarRepository.create({ car_id, image_name })
        );
    }
}
