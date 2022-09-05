import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateRentals1657043148364 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rentals",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp",
                    },
                    {
                        name: "total",
                        type: "numeric",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],

                foreignKeys: [
                    {
                        name: "FKCarRental",
                        columnNames: ["car_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "cars",
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKUserRental",
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );

        // await queryRunner.createForeignKey(
        //     "rentals",
        //     new TableForeignKey({
        //         name: "FKRentalsCar",
        //         columnNames: ["car_id"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "cars",
        //         onDelete: "SET NULL",
        //         onUpdate: "SET NULL",
        //     })
        // );

        // await queryRunner.createForeignKey(
        //     "rentals",
        //     new TableForeignKey({
        //         name: "FKRentalsUser",
        //         columnNames: ["user_id"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "users",
        //         onDelete: "SET NULL",
        //         onUpdate: "SET NULL",
        //     })
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey("rentals", "FKRentalsCar");
        // await queryRunner.dropForeignKey("rentals", "FKRentalsUser");
        await queryRunner.dropTable("rentals");
    }
}
