import { Request, Response, NextFunction } from "express";
import {
    createHotelService,
    getAllHotelService,
    getHotelByIdService,
    deleteHotelService,
    updateHotelService,
} from "../services/hotel.service.js";

export async function createHotelHandler(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const hotelResponse = await createHotelService(req.body);

    res.status(201).json({
        message: "Hotel created successfully",
        data: hotelResponse,
        success: true,
    });
}

export async function getHotelByIdHandler(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    res.status(200).json({
        message: "Hotel found successfully",
        data: hotelResponse,
        success: true,
    });
}

export async function getAllHotelHandler(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const hotelResponse = await getAllHotelService();

    res.status(200).json({
        message: "Hotels found successfully",
        data: hotelResponse,
        success: true,
    });
}

export async function deleteHotelHandler(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const hotelResponse = await deleteHotelService(Number(req.params.id));

    res.status(200).json({
        message: "Hotel deleted successfully",
        data: hotelResponse,
        success: true,
    });
}

export async function updateHotelHandler(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const hotelResponse = await updateHotelService(Number(req.params.id), req.body.name);

    res.status(200).json({
        message: "Hotel updated successfully",
        data: hotelResponse,
        success: true,
    });
}
