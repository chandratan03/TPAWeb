import { User } from './user'

export class Message {
    from: number
    fromUser: User
    to:number
    toUser:User
    message:string
    date:Date
    image:string
}
