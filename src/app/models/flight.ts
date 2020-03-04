import { Airline } from './airline'
import {Route} from './route'
import { Airport } from './airport'
import { Time } from '@angular/common'
import { AirlineFacility } from './airline-facility'
export class Flight {
    id: number
    airlineRefer:number
    airline: Airline
    routes: Route[]
    transit: number
    sTransit: string
    fromRefer:number
    from: Airport
    toRefer:number
    to: Airport
    departure: string
    arrival: string
    duration: number
    price: number
    tax: number
    serviceCharge: number
    timeDepature: Time
    timeArrival: Time    
    airlineFacilities: AirlineFacility[]
    total:number
    classPrice:number
    DEPARTURE:Date
    ARRIVAL:Date
}
