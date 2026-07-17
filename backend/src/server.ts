import express from "express";
import cors from "cors";
import { AppDataSorce } from "./config/data-source";
import * as dotenv from "dotenv";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

const Port = Number(process.env.PORT) || 3000;

AppDataSorce.initialize().then(() => {
    console.log("Banco inicializado")

    app.listen(Port, () => {
        console.log(`Servidor rodando: http://localhost:${Port}`);
    })
})