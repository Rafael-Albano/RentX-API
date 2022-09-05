import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Car } from "./Cars";

@Entity("cars_image")
export class CarImage {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @Column()
    private created_at: Date;

    @Column()
    private updated_at: Date;

    constructor() {
        this.id = this.id ?? uuidv4();
    }
}
