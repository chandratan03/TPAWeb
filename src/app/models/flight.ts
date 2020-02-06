import { Airline } from './airline'
import {Route} from './route'
import { Airport } from './airport'
export class Flight {
    id: string
    airline: Airline
    routes: Route[]
    transit: number
    sTransit: string
    from: Airport
    to: Airport
    departure: string
    arrival: string
    duration: number
    price: number
    tax: number
    serviceCharge: number
    

}