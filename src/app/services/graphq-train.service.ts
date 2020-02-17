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
      query GetTrainTripsByFromToId($fromId: Int, $toId: Int, $date: String){
	
        trainTripsFromToDate(fromId: $fromId,toId:$toId, date:$date){
                id
                from{
                  id
                  name
                  stationCode
                  area{
                    id
                    areaName
                    city{
                      cityCode
                      cityName
                      id
                      
                      region{
                        id
                         regionName
                      }
                    }
                  }
                }
                to{
                  id
                  name
                  stationCode
                  area{
                    id
                    areaName
                    city{
                      cityCode
                      cityName
                      id
                      region{
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
                  trainClass{
                    id
                    className
                    pricePercentage
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
          from{
            id
            name
            stationCode
            area{
              id
              areaName
              city{
                cityCode
                cityName
                id
                
                region{
                  id
                   regionName
                }
              }
            }
          }
          to{
            id
            name
            stationCode
            area{
              id
              areaName
              city{
                cityCode
                cityName
                id
                region{
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
            trainClass{
              id
              className
              pricePercentage
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

}
