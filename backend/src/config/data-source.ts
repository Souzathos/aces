import "reflect-metadata";

import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_PORT, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const AppDataSorce = new DataSource({
    type: "mysql",
    database: DB_NAME,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    logging: true,
    synchronize: true,
    entities: ["src/models/*.ts"],
});