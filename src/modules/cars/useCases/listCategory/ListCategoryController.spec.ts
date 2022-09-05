import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Category Controller", () => {
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

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/v1/session").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        await request(app)
            .post("/v1/categories")
            .send({
                name: "Category Supertest name",
                description: "Category Supertest description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get("/v1/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest name");
    });
});
