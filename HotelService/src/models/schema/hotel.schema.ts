import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const hotelsTable = pgTable("hotels", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    address: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    rating: integer().notNull().default(0),
    ratingCount: integer("rating_count").notNull().default(0),
});