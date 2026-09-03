import express from "express";
import { validateRequestBody } from "../validators/index.js";
import { bookingSchema } from "../validators/booking.validator.js";
import {
    confirmBookingHandler,
    proceedDemoBookingHandler,
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", validateRequestBody(bookingSchema), proceedDemoBookingHandler);
bookingRouter.post("/confirm/:idempotencyKey", confirmBookingHandler);

export default bookingRouter;
