import db from "../models/index.js";
import { hotelsTable } from "../models/schema/hotel.schema.js";
import type { createHotelDTO } from "../dto/hotel.dto.ts";
import { NotFoundError } from "../utils/errors/app.error.js";
import { eq } from "drizzle-orm";
import logger from "../config/logger.config.js";

export async function createHotel(hotelData: createHotelDTO) {
    const [hotel] = await db
        .insert(hotelsTable)
        .values({
            name: hotelData.name,
            address: hotelData.address,
            location: hotelData.location,
            rating: hotelData.rating,
            ratingCount: hotelData.ratingCount,
        })
        .returning();

    logger.info(`Hotel created: ${hotel.id}`);
    return hotel;
}

export async function getHotelById(id: number) {
    const [hotel] = await db
        .select()
        .from(hotelsTable)
        .where(eq(hotelsTable.id, id));

    if (!hotel) {
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    logger.info(`Hotel found : ${hotel.id}`);
    return hotel;
}

export async function getAllHotel() {
    const hotel = await db.select().from(hotelsTable);
    return hotel;
}

export async function deleteHotel(id: number) {
    const [hotel] = await db
        .select()
        .from(hotelsTable)
        .where(eq(hotelsTable.id, id));

    if (!hotel) {
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    await db.delete(hotelsTable).where(eq(hotelsTable.id, id));

    return hotel;
}

export async function updateHotel(id: number, name: string) {
    const [hotel] = await db
        .select()
        .from(hotelsTable)
        .where(eq(hotelsTable.id, id));

    if (!hotel) {
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }

    const [newHotel] = await db
        .update(hotelsTable)
        .set({
            name,
        })
        .where(eq(hotelsTable.id, id))
        .returning();

    return newHotel;
}
