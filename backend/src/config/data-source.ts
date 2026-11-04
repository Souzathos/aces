import "reflect-metadata";

import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UBS } from "../models/Ubs";
import { User } from "../models/User";
import { Patient } from "../models/Patient";
import { Doctor } from "../models/Doctor";
import { Review } from "../models/Review";

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
    entities: ["../models/*.ts"],
});