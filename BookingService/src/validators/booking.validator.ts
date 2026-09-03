import { z } from "zod";

export const bookingSchema = z.object({
    userId: z.number({ message: "User Id must be present in a number format" }),
    hotelId: z.number({
        message: "Hotel Id must be present in a number format",
    }),
    totalGuests: z
        .number({ message: "Total guests must be present in a number format" })
        .min(1, { message: "Total guests must be minimum 1" }),
    bookingAmount: z
        .number({ message: "Booking must be present in a number format" })
        .min(1, { message: "Booking amount must be greater than 1" }),
});
