import db from "../models/index.js";
import { BookingInput } from "../dto/booking.dto.js";
import {
    confirmBooking,
    proceedDemoBooking,
    insertIdempotencyKey,
    finalizeIdempotencyKey,
    getIdempotencyKeyWithLock,
} from "../repositories/booking.repository.js";
import { NotFoundError, BadRequestError } from "../utils/errors/app.error.js";
import { generateIdempotencyKey } from "../utils/helpers/generateIdempotencyKeys.js";
import redlock from "../config/redlock.config.js";
import { serverConfig } from "../config/index.js";

export async function proceedDemoBookingService(bookingInput: BookingInput) {
    const lock = await redlock.acquire(
        [`proceed-booking:user:${bookingInput.userId}`],
        serverConfig.LOCK_TTL,
    );

    try {
        return await db.transaction(async (tx) => {
            const booking = await proceedDemoBooking(tx, {
                userId: bookingInput.userId,
                hotelId: bookingInput.hotelId,
                totalGuests: bookingInput.totalGuests,
                bookingAmount: bookingInput.bookingAmount,
            });

            const idempotencyKey = generateIdempotencyKey();

            await insertIdempotencyKey(tx, idempotencyKey, booking.id);

            return {
                bookingId: booking.id,
                idempotencyKey,
            };
        });
    } finally {
        await lock.release();
    }
}

export async function confirmBookingService(idempotencyKey: string) {
    return await db.transaction(async (tx) => {
        const idempotencyKeyData = await getIdempotencyKeyWithLock(
            tx,
            idempotencyKey,
        );

        if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
            throw new NotFoundError("Idempotency key not found");
        }

        if (idempotencyKeyData.finalized) {
            throw new BadRequestError("Idempotency key is already finalized");
        }

        const booking = await confirmBooking(
            tx,
            idempotencyKeyData.bookingId as number,
        );

        await finalizeIdempotencyKey(tx, idempotencyKey);

        return booking;
    });
}
