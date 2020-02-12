import { HotelFacility } from './hotel-facility'
import { City } from './city'
export class Hotel {
    id: string
    hotelName: string
    address: string
    rate: number
    price: number
    longtitude: number
    latitude: number
    city: City
    hotelFacilities: HotelFacility[]
}
