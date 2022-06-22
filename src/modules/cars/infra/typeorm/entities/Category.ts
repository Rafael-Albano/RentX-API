import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("categories")
export class Category {
    @PrimaryColumn()
    private id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    private created_at: Date;

    @UpdateDateColumn()
    private updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
