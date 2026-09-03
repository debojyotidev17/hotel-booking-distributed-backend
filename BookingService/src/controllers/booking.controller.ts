import { Request, Response } from "express";
import {
    confirmBookingService,
    proceedDemoBookingService,
} from "../services/booking.service.js";
import redis from "../config/redis.config.js"

export const proceedDemoBookingHandler = async (req: Request, res: Response) => {
    const booking = await proceedDemoBookingService(req.body);
    res.status(201).json(booking);
};

export const confirmBookingHandler = async (req: Request, res: Response) => {
    const booking = await confirmBookingService(req.params.idempotencyKey as string);

    res.status(200).json({
        bookingId: booking.id,
        status: booking.status,
    });
};
