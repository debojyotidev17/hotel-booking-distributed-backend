import { get } from "http";
import { createHotelDTO } from "../dto/hotel.dto.js";
import {
    createHotel,
    deleteHotel,
    getAllHotel,
    getHotelById,
    updateHotel,
} from "../repositories/hotel.repository.js";

export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function getAllHotelService() {
    const hotel = await getAllHotel();
    return hotel;
}

export async function deleteHotelService(id: number) {
    const hotel = await deleteHotel(id);
    return hotel;
}

export async function updateHotelService(id: number, name: string) {
    const hotel = await updateHotel(id, name);
    return hotel;
}
