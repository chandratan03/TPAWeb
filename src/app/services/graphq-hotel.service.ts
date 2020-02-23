import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Query } from '../models/query';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqHotelService {

  constructor(private apollo: Apollo) { }

  
  getHotelRoomsByHotelId(hotelId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query GetHotelRoomsByHotelId($hotelId:Int){
        hotelRoomByHotelId(hotelId: $hotelId){
          id
          name
          hotelId
          imagePath
          maxGuest
          quantity
          space
          freeWifi
          freeBreakFast
          price
          images{
            id
            hotelRoomId
            path
          }
          hotelRoomBeds{
            id
            hotelRoomId
            bed {
              bedName
            }
          }
          
        }
      }
      `,
      variables: {
        "hotelId": hotelId,
      }
    })
  }

  getHotelById(hotelId: number): Observable<Query> { 
    return this.apollo.query<Query>({
      query: gql`
      query getHotelById($hotelId: Int){
        hotelById(hotelId: $hotelId){
          id
          hotelName
          rate
          address
          imagePath
          price
          discountPercentage
          discountPrice
          quantity
          longitude
          latitude
          city{
            cityName
            region{
              regionName
            }
          }
          
          hotelFacilities{
            id
            hotelId
            facility{
              id
              name
              imagePath
            }
          }
          ratings{
            id
            hotelId
            date
            description
            rateScore
          }
          hotelRooms{
            id
            hotelId
            name
            maxGuest
            price
            quantity
            space
            freeWifi
            freeBreakFast
            hotelRoomBeds{
              id
              hotelRoomId
              bed{
                id
                bedName
              }
            }
          }
          area{
            areaName
            id
            city{
              id
              cityCode
              cityName
              region{
                regionName
                id
              
              }
            }
          }
        }
      }
      `,
      variables: {
        "hotelId": hotelId,
      },
    })
  }
  

  getHotelTickets():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getHotelTickets{
        hotelTickets{
          id
          price
          quantity
          hotelId
          hotel{
            id
            hotelName
            rate
            address
            imagePath
            price
            discountPercentage
            discountPrice
            quantity
            longitude
            latitude

            
            hotelFacilities{
              id
              hotelId
              facility{
                id
                name
                imagePath
                __typename
              }
            }
            ratings{
              __typename
              id
              hotelId
              date
              description
              rateScore
            }
            hotelRooms{
              __typename
              id
              hotelId
              name
              maxGuest
              price
              quantity
              space
              freeWifi
              imagePath
              freeBreakFast
              hotelRoomBeds{
                __typename
                id
                hotelRoomId
                bed{
                  id
                  bedName
                }
              }
            }
            area{
              __typename
              areaName
              id
              city{
                __typename
                id
                cityCode
                cityName
                region{
                  __typename
                  regionName
                  id
                
                }
              }
            }
          }
        }
      }
      
      
      `
    })
  }
  getHotelTicketById(id:number):Observable<any>{
    return this.apollo.query<any>({
      query:gql`
      query getHotelTicketById($id){
        hotelTicketById(id:$id){
          id
          price
          quantity
          hotelId
        hotel{
          id
          hotelName
          rate
          address
          imagePath
          price
          discountPercentage
          discountPrice
          quantity
          longitude
          latitude
          city{
            cityName
            region{
              regionName
            }
          }
          
          hotelFacilities{
            id
            hotelId
            facility{
              id
              name
              imagePath
            }
          }
          ratings{
            id
            hotelId
            date
            description
            rateScore
          }
          hotelRooms{
            id
            hotelId
            name
            maxGuest
            price
            quantity
            space
            freeWifi
            imagePath
            freeBreakFast
            hotelRoomBeds{
              id
              hotelRoomId
              bed{
                id
                bedName
              }
            }
          }
          area{
            areaName
            id
            city{
              id
              cityCode
              cityName
              region{
                regionName
                id
              
              }
            }
          }
          }
        }
      }

      
      `,
      variables: {
        "id": id,
      }
    })
  }

  insertHotelTicket(hotelId:number, date:string, quantity:number, price:number):Observable<any>{
    return this.apollo.mutate<any>({
        mutation: gql`
        mutation insertHotelTicket($hotelId:Int!,$date:String!, $quantity:Int!, $price:Float!){
          insertHotelTicket(hotelId:$hotelId, date:$date, quantity:$quantity, price:$price){
            id      
          }
        }
        `
      ,variables:{
        "hotelId": hotelId,
        "date": date,
        "quantity": quantity,
        "price": price,
      }
    })
  }

  updateHotelTicket(id:number,hotelId:number, date:string, quantity:number, price:number):Observable<any>{
    return this.apollo.mutate<any>({
        mutation: gql`
        mutation updateHotelTicket($id:Int!,$hotelId:Int!,$date:String!, $quantity:Int!, $price:Float!){
          updateHotelTicket(id:$id,hotelId:$hotelId, date:$date, quantity:$quantity, price:$price){
            id      
          }
        }
        `
      ,variables:{
        "id": id,
        "hotelId": hotelId,
        "date": date,
        "quantity": quantity,
        "price": price,
      }
    })
  }
  deleteHotelTicket(id:number):Observable<any>{
    return this.apollo.mutate<any>({
        mutation: gql`
        mutation deleteHotelTicket($id:Int!){
          deleteHotelTicket(id:$id){
            id      
          }
        }
        `
      ,variables:{
        "id": id,
      }
    })
  }
  getCities():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getCitiess{
        cities{
          id
          cityName
          cityCode
          region{
            id
            regionName
          }
        }
      }
      `
    })
  }


  getHotels(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getHotels{
          hotels{
            id
            hotelName
            rate
            address
            imagePath
            price
            discountPercentage
            discountPrice
            quantity
            longitude
            latitude
            city{
              id
              cityName
              region{
                id
                regionName
              }
            }
            
            hotelFacilities{
              id
              hotelId
              facility{
                id
                name
                imagePath
              }
            }
            ratings{
              id
              hotelId
              date
              description
              rateScore
            }
            hotelRooms{
              id
              hotelId
              name
              maxGuest
              price
              quantity
              space
              freeWifi
              freeBreakFast
              hotelRoomBeds{
                id
                hotelRoomId
                bed{
                  id
                  bedName
                }
              }
            }
            area{
              areaName
              id
              city{
                id
                cityCode
                cityName
                region{
                  regionName
                  id
                
                }
              }
            }
          }
        }
      `
    })
  }
}
