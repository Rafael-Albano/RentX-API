import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 10);

    await connection.query(
        `INSERT INTO USERS(id, name, password, email, "isAdmin", created_at, updated_at, driver_license)
            VALUES('${id}', 'admin', '${password}', 'admin@rentx.com.br', true, 'now()', 'now()', 'XXXXXX')
        `
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));
