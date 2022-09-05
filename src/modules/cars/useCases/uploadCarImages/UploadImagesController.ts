import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadImageUseCase } from "./UploadImagesUseCase";

type Files = {
    filename: string;
};

export class UploadImageController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { car_id } = request.params;
        const images = request.files as Files[];
        const uploadImageUseCase = container.resolve(UploadImageUseCase);
        const images_name = images.map((file) => file.filename);

        await uploadImageUseCase.execute({ images_name, car_id });
        return response.status(201).send();
    }
}
