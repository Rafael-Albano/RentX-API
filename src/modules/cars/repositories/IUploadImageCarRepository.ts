import { CarImage } from "../infra/typeorm/entities/CarImage";

export type CreateUploadImageCarDTO = {
    car_id: string;
    image_name: string;
};

export interface IUploadImageCarRepository {
    create({ car_id, image_name }: CreateUploadImageCarDTO): Promise<CarImage>;
}
