import { Train } from './train'
import { Station } from './station'
import { Time } from '@angular/common'

export class TrainTrip {
    id: number
    trainId: number
    train: Train
    from: Station
    to: Station
    departure: Date
    timeDeparture: Time
    arrival : Date
    timeArrival: Time
    duration: number
    price: number
    tax: number
    serviceChange: number
}
