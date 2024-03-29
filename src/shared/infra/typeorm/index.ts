import { Connection, createConnection, getConnectionOptions } from "typeorm";

// type Options = {
//     host: string;
// };

// getConnectionOptions().then((options) => {
//     const newOptions = options as Options;
//     newOptions.host = "database";
//     createConnection({
//         ...options,
//     });
// });

export default async (host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === "test" ? "localhost" : host,
            database:
                process.env.NODE_ENV === "test"
                    ? "rentx_database_test"
                    : defaultOptions.database,
            port: process.env.NODE_ENV === "test" ? 5444 : 5432,
        })
    );
};
