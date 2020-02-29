import { City } from './city'
import { ImageEntertainment } from './image-entertainment'

export class Entertainment {
    id:number
    name:string
    price:number
    category:string
    image:string
    longitude:number
    latitude:number
    cityId:number
    city:City
    isTrending:boolean
    imageEntertainments:ImageEntertainment[]
}
