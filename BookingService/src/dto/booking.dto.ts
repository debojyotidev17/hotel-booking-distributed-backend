import { bookingStatusEnum } from "../models/schema/booking.schema.js";

export type BookingInput = {
    userId: number;
    hotelId: number;
    createdAt?: Date;
    updatedAt?: Date;
    bookingAmount: number;
    status?: (typeof bookingStatusEnum.enumValues)[number];
    totalGuests: number;
};
