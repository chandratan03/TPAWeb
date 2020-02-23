import { Hotel } from './hotel';

export class HotelTicket {
    id: number
    hotelId: number
    date: Date
    price: number
    quantity: number;
    hotel: Hotel
}
