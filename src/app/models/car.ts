import { Brand } from './brand'
import { VendorCar } from './vendor-car'

export class Car {
    id: number
    price: number
    brandId: number
    brand: Brand
    vendorCars: VendorCar[]
    model:string
    capacity: number
    luggage: number
    imagePath: string
}
