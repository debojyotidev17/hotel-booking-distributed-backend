import db, { Transaction } from "../models/index.js";
import { eq, sql } from "drizzle-orm";
import { BookingInput } from "../dto/booking.dto.js";
import { bookings, idempotencyKeys } from "../models/schema/booking.schema.js";

export async function proceedDemoBooking(
    tx: Transaction,
    bookingInput: BookingInput,
) {
    const [booking] = await tx
        .insert(bookings)
        .values(bookingInput)
        .returning();

    return booking;
}

export async function insertIdempotencyKey(
    tx: Transaction,
    key: string,
    bookingId: number,
) {
    const [idempotencyKey] = await tx
        .insert(idempotencyKeys)
        .values({
            key,
            bookingId,
        })
        .returning();

    return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(tx: Transaction, key: string) {
    const result = await tx.execute(sql`
      SELECT *
      FROM idempotency_keys
      WHERE key = ${key}
      FOR UPDATE
    `); // Another Request will get stopped here

    return result.rows[0];
}

export async function getBookingById(bookingId: number) {
    const [booking] = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, bookingId));

    return booking;
}

export async function confirmBooking(tx: Transaction, bookingId: number) {
    const [booking] = await tx
        .update(bookings)
        .set({
            status: "CONFIRMED",
        })
        .where(eq(bookings.id, bookingId))
        .returning();

    return booking;
}

export async function cancelBooking(bookingId: number) {
    const [booking] = await db
        .update(bookings)
        .set({
            status: "CANCELLED",
        })
        .where(eq(bookings.id, bookingId))
        .returning();

    return booking;
}

export async function finalizeIdempotencyKey(tx: Transaction, key: string) {
    await tx
        .update(idempotencyKeys)
        .set({
            finalized: true,
        })
        .where(eq(idempotencyKeys.key, key));
}
