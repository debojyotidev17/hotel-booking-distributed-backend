import dotenv from "dotenv";

type serverConfig = {
    PORT: number;
};

dotenv.config();

export const serverConfig: serverConfig = {
    PORT: Number(process.env.PORT) || 3001,
};