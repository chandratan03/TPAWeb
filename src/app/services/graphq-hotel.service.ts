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
  
}
