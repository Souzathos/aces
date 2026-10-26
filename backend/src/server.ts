import express from "express";
import cors from "cors";
import { AppDataSorce } from "./config/data-source";
import * as dotenv from "dotenv";
import route from "./routes/index.routes";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", route);

const Port = Number(process.env.PORT) || 3000;

AppDataSorce.initialize().then(() => {
    console.log("Database initialized")

    app.listen(Port, () => {
        console.log(`Server running at http://localhost:${Port}`);
    })
}).catch((error) => {
    console.error("Error during Data Source initialization", error);
});