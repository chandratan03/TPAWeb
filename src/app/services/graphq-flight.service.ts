import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqFlightService {

  constructor(private apollo: Apollo) { }
  getAirlines(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      {  
        airlines{
            id
            name
            path
          }
      }
      ` 
    })
  }

  getAirports(): Observable<Query>{
    return this.apollo.query<Query>({
      query:gql`
      {
        airports{
          id
          name
          city{
            id
            cityCode
            cityName
             region{
              id
              regionName
            }
          }
        }
      }
        
      `
    })
  }
  getFlights(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getFlights{
          flights{

            id
           arrival
           departure
           duration
           price
           tax
           serviceCharge
           airline{
             id 
             name
             path
             airlineFacilities{
              id
              facility{
                id
                name
                imagePath
                forObject
              }
            }
           }
           from{
             id
             name
             city{
               cityName
               cityCode
               id
               region{
                 regionName
                 id
               }
             }
           }
           to{
             id
             name
             city{
               cityName
               cityCode
               id
               region{
                 regionName
                 id
               }
             }  
           }
            routes{
             id
              to{
               id
               name
               city{
                 cityName
                 cityCode
                 id
                 region{
                   regionName
                   id
                 }
               }  
             }
             from{
               id
               name
               city{
                 cityName
                 cityCode
                 id
                 region{
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


  insertFlight(airlineRefer:number, routeIds: number[], transit: number, fromRefer:number, toRefer:number,
      departure:string, arrival:string, duration:number, price:number,tax:number, serviceCharge:number
    ):Observable<any>{
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation createFlight($airlineRefer:Int!, $routeIds: [Int], $transit:Int, $fromRefer: Int, $toRefer: Int, 
        $departure:String, $arrival:String, $duration:Int, $price:Int, $tax:Int, $serviceCharge:Int){
        createFlight(airlineRefer: $airlineRefer, routeIds:$routeIds, transit:$transit, fromRefer:$fromRefer, toRefer:$toRefer,
          departure:$departure, arrival:$arrival, duration:$duration, price:$price, tax:$tax, serviceCharge:$serviceCharge
        ){
          id
        }
      }      
      `
      ,variables:{
        "airlineRefer":airlineRefer,
        "routeIds": routeIds,
        "transit": transit,
        "fromRefer": fromRefer,
        "toRefer": toRefer,
        "departure":departure,
        "arrival": arrival,
        "duration": duration,
        "price": price,
        "tax":tax,
        "serviceCharge": serviceCharge
      }
    })
  }
  updateFlight(id:number,airlineRefer:number, routeIds: number[], transit: number, fromRefer:number, toRefer:number,
    departure:string, arrival:string, duration:number, price:number,tax:number, serviceCharge:number
  ):Observable<any>{
  return this.apollo.mutate<any>({
    mutation: gql`
    mutation updateFlight($id: Int!,$airlineRefer:Int!, $routeIds: [Int], $transit:Int, $fromRefer: Int, $toRefer: Int, 
      $departure:String, $arrival:String, $duration:Int, $price:Int, $tax:Int, $serviceCharge:Int){
      updateFlight(id: $id,airlineRefer: $airlineRefer, routeIds:$routeIds, transit:$transit, fromRefer:$fromRefer, toRefer:$toRefer,
        departure:$departure, arrival:$arrival, duration:$duration, price:$price, tax:$tax, serviceCharge:$serviceCharge
      ){
        id
      }
    }      
    `
    ,variables:{
      "id": id,
      "airlineRefer":airlineRefer,
      "routeIds": routeIds,
      "transit": transit,
      "fromRefer": fromRefer,
      "toRefer": toRefer,
      "departure":departure,
      "arrival": arrival,
      "duration": duration,
      "price": price,
      "tax":tax,
      "serviceCharge": serviceCharge
    }
  })
  }


  deleteFlight(id:number):Observable<any>{
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation deleteFlight($id: Int!){
        deleteFlight(id:$id){
           id   
        }
      }
          
      `
      ,variables:{
        "id":id,
        
      }
    })
  }
}
