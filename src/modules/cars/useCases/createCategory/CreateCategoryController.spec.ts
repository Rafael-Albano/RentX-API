import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 10);

        await connection.query(
            `INSERT INTO USERS(id, name, password, email, "isAdmin", created_at, updated_at, driver_license)
            VALUES('${id}', 'admin', '${password}', 'admin@rentx.com.br', true, 'now()', 'now()', 'XXXXXX')
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/v1/session").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/v1/categories")
            .send({
                name: "Category Supertest name",
                description: "Category Supertest description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("should  not be able to create a new category with same name exists", async () => {
        const responseToken = await request(app).post("/v1/session").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/v1/categories")
            .send({
                name: "Category Supertest name",
                description: "Category Supertest description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
