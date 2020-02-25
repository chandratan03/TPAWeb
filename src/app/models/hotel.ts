import { HotelFacility } from './hotel-facility'
import { City } from './city'
import { Rating } from './rating'
import { Area } from './area'
import { HotelRoom } from './hotel-room'
export class Hotel {
    id: number
    hotelName: string
    address: string
    rate: number
    price: number
    longitude: number
    latitude: number
    city: City
    discountPrice: number
    discountPercentage: number
    quantity: number
    hotelFacilities: HotelFacility[]
    hotelRooms: HotelRoom[]
    ratings: Rating[]
    ratingNumber:  number
    area: Area
    category: string
}
