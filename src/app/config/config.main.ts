import { config as dotenv } from "dotenv";
dotenv();

export const config = {
    server: {
        port: parseInt(process.env.PORT, 10),
        mode: process.env.MODE_ENV
    }
}