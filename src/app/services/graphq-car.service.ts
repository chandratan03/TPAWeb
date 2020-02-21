import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Query } from '../models/query';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqCarService {

  constructor(private apollo: Apollo) { }

  getCars(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query {
        cars{
          id
          brand{
            id
            name
            imagePath
          }
          capacity
          luggage
          model
          price
          imagePath
          vendorCars{
            id
            price
            area{
              id
              areaName
            }
            vendor{
              id
              name
              imagePath
              
            }
          }
          
        }
      
      }
      `
    })
  }
  getCarsByCityId(cityId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query carsByCity($cityId: Int){
        CarsByCity(cityId: $cityId){
          id
          brand{
            id
            name
            imagePath
          }
          capacity
          luggage
          model
          price
          imagePath
          vendorCars{
            id
            price
            area{
              id
              areaName
            }
            vendor{
              id
              name
              imagePath
              
            }
          }
          
        }
      
      }
      `,
      variables:{
        "cityId": cityId
      }
    })
  }

}
