import { TrainClass } from './train-class'
import { TrainType } from './train-type'

export class Train {
    id: number
    name: string
    trainClass: TrainClass
    trainSubClass: string
    trainType: TrainType
    trainTypeId: number
}
