import { City } from './city';

export class User {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string
    phoneNumber: string;
    nationality: string
    gender:string
    address: string
    postCode:string
    city: City
    emailVerified:boolean
    phoneVerified:boolean
    language: string
    isAdmin:boolean
}

