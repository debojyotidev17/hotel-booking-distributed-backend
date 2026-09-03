import dotenv from "dotenv";

type serverConfig = {
    PORT: number;
    LOCK_TTL: number;
};

dotenv.config();

export const serverConfig: serverConfig = {
    PORT: Number(process.env.PORT) || 3001,
    LOCK_TTL: Number(process.env.LOCK_TTL),
};
