import {
    pgTable,
    integer,
    varchar,
    timestamp,
    pgEnum,
    boolean,
} from "drizzle-orm/pg-core";

// ENUM
export const bookingStatusEnum = pgEnum("booking_status", [
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
]);

// BOOKINGS TABLE
export const bookings = pgTable("bookings", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id").notNull(),
    hotelId: integer("hotel_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    bookingAmount: integer("booking_amount").notNull(),
    status: bookingStatusEnum("status").default("PENDING").notNull(),
    totalGuests: integer("total_guests").notNull(),
});

// IDEMPOTENCY KEYS TABLE
export const idempotencyKeys = pgTable("idempotency_keys", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    key: varchar("key", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    finalized: boolean("finalized").default(false).notNull(),
    bookingId: integer("booking_id")
        .unique()
        .references(() => bookings.id),
});
