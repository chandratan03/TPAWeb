import { HotelFacility } from './hotel-facility'
import { City } from './city'
import { Rating } from './rating'
import { Area } from './area'
export class Hotel {
    id: string
    hotelName: string
    address: string
    rate: number
    price: number
    longtitude: number
    latitude: number
    city: City
    discountPrice: number
    discountPercentage: number
    hotelFacilities: HotelFacility[]
    ratings: Rating[]
    area: Area
}
