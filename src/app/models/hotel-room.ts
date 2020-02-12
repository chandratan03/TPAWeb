import { HotelRoomBed } from './hotel-room-bed'

export class HotelRoom {
    id: number
    name :string
    hotelId: number
    imagePath: string
    maxGuest: number
    price: number
    quantity: number
    hotelRoomBeds: HotelRoomBed[]
    space : number
    freeBreakFast: boolean
    freeWifi: boolean


}
