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
        }
      }
      `,
      variables: {
        "hotelId": hotelId,
      },
    })
  }
  
}
