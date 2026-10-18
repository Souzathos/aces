import "reflect-metadata";

import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UBS } from "../models/UBS";
import { User } from "../models/User";
import { Attendance } from "../models/Attendance";
import { Patient } from "../models/Patient";
import { Doctor } from "../models/Doctor";
import { Prescription } from "../models/Prescription";
import { PrescriptionMedication } from "../models/PrescriptionMedication";
import { MedicalHistory } from "../models/MedicalHistory";
import { Review } from "../models/Review";
import { Presence } from "../models/Presence";

dotenv.config();

export const AppDataSorce = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        UBS,
        User,
        Attendance,
        Patient,
        Doctor,
        Prescription,
        PrescriptionMedication,
        MedicalHistory,
        Review,
        Presence,
    ],
});