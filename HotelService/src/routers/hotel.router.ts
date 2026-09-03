import express from "express";
import { validateRequestBody } from "../validators/index.js";
import {
    createHotelHandler,
    deleteHotelHandler,
    getAllHotelHandler,
    getHotelByIdHandler,
    updateHotelHandler,
} from "../controllers/hotel.controller.js";
import { hotelSchema } from "../validators/hotel.validator.js";

const hotelRouter = express.Router();

hotelRouter.post("/", validateRequestBody(hotelSchema), createHotelHandler);
hotelRouter.get("/:id", getHotelByIdHandler);
hotelRouter.get("/", getAllHotelHandler);
hotelRouter.delete("/:id", deleteHotelHandler);
hotelRouter.put("/:id", updateHotelHandler);

export default hotelRouter;
