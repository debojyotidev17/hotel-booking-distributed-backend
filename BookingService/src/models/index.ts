import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export default db;