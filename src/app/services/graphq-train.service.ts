import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Query } from '../models/query';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GraphqTrainService {

  constructor(private apollo: Apollo) { }

  getTrainTripsByFromToDate(fromId:number, toId:number, date:string): Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetTrainTripsByFromToId($fromId: Int, $toId: Int, $date: String) {
        trainTripsFromToDate(fromId: $fromId, toId: $toId, date: $date) {
          id
          from {
            id
            name
            stationCode
            area {
              id
              areaName
              city {
                cityCode
                cityName
                id
                region {
                  id
                  regionName
                }
              }
            }
          }
          to {
            id
            name
            stationCode
            area {
              id
              areaName
              city {
                cityCode
                cityName
                id
                region {
                  id
                  regionName
                }
              }
            }
          }
          serviceCharge
          price
          tax
          train {
            id
            name
            trainClassId
            trainClass {
              id
              className
              pricePercentage
            }
            trainType {
              id
              name
            }
            trainSubClass
          }
          duration
          departure
          arrival
        }
      }
      
      `,
      variables:{
        "fromId": fromId,
        "toId": toId,
        "date": date
      }
    })
  }


  getTrainTrips(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query{
        trainTrips{
          id
          from {
            id
            name
            stationCode
            area {
              id
              areaName
              city {
                cityCode
                cityName
                id
                region {
                  id
                  regionName
                }
              }
            }
          }
          to {
            id
            name
            stationCode
            area {
              id
              areaName
              city {
                cityCode
                cityName
                id
                region {
                  id
                  regionName
                }
              }
            }
          }
          serviceCharge
          price
          tax
          train {
            id
            name
            trainClassId
            trainClass {
              id
              className
              pricePercentage
            }
            trainType {
              id
              name
            }
            trainSubClass
          }
          duration
          departure
          arrival 
        }
      } 
      `
    })
  }
  
  getStations(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query{
        stations{
          id
          name
          stationCode
          area{
            areaName
            city{
              id
              cityName
              cityCode
              region{
                id
                regionName
              }
            }
          
          }
        }
      }
      `
    })
  }
//TrainId:       uint(trainId),
//FromRefer:     uint(fromRefer),
//ToRefer:       uint(toRefer),
//Departure:     departureTime,
//Arrival:       arrivalTime,
//Duration:      uint(duration),
//Price:         price,
//Tax:           tax,
//ServiceCharge: serviceCharge,

  insertTrainTrip(trainId:number, fromRefer:number, toRefer:number, 
    departure: string, arrival:string, duration:number, price:number, tax:number, serviceCharge:number):Observable<any>{
      return this.apollo.mutate<any>({
        mutation:gql`
          mutation insertTrainTrip($trainId: Int!, $fromRefer: Int!, $toRefer:Int!, $departure:String!, $arrival:String!, $duration:Int!,
            $price: Float!, $tax: Float!, $serviceCharge:Float!
          ){
            insertTrainTrip(trainId: $trainId, fromRefer:$fromRefer, toRefer:$toRefer, departure:$departure, arrival:$arrival,
              duration:$duration, price:$price, tax:$tax, serviceCharge:$serviceCharge
            ){
              id
            }
          }
        `,
        variables:{
          "trainId":trainId,
          "fromRefer": fromRefer,
          "toRefer":toRefer,
          "departure": departure,
          "arrival": arrival,
          "duration": duration,
          "price": price,
          "tax": tax,
          "serviceCharge":serviceCharge
        }
      })
  }
  

  deleteTrainTripById(id: number):void{
    this.apollo.mutate<any>({
      mutation: gql`
        mutation deleteTrainTrip($id: Int!){
          deleteTrainTrip(id: $id){
            id
          }
        }
      `,
      variables:{
        "id": id
      }
    }
    )
  }

  getTrains():Observable<Query>{
    return this.apollo.query<Query>({
      query:gql`
        query{
          trains{
            id
            name
            trainClass{
              className
              id
              pricePercentage
            }
            trainClassId
            trainSubClass
            trainType{
              id
              name
            }
          
          }
        }
      `
    })
  }

  getTrainTypes():Observable<Query>{
    return this.apollo.query<Query>({
      query:gql`
        query{
          trainTypes{
            id
            name
          }
        }
      `
    })
  }


}
