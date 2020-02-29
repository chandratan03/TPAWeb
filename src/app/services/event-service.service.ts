import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private apollo: Apollo) {

  }

  getEntertainments(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query{
        entertainments{
          id
          name
          price
          category
          image
          longitude
          latitude
          cityId
          isTrending
          city{
            id
            cityCode
            cityName
            thumbnail
            region{
              id
              regionName
            }
          }
          imageEntertainments{
            id
            entertainmentId
            path
          }
        }
      }
      `
    })
  }

  getEntertainmentTickets():Observable<Query>{
    return this.apollo.query<Query>({
      query : gql`
      {
        entertainmentTickets{
          date
          discountPercentage
          
          entertainmentId
          id
          price
          entertainment{
          id
          name
          price
          category
          image
          longitude
          latitude
          cityId
          city{
            id
            cityCode
            cityName
            thumbnail
            region{
              id
              regionName
            }
          }
          imageEntertainments{
            id
            entertainmentId
            path
          }
        }
        }
        
        
      }
      `
    })
  }
  getEntertainmentTicketsByCityId(cityId:number):Observable<Query>{
    return this.apollo.query<Query>({
      query : gql`
      query entertainmentsTicketsByCityId($cityId: Int){
        entertainmentsTicketsByCityId(cityId:$cityId){
          date
          discountPercentage
          
          entertainmentId
          id
          price
          entertainment{
          id
          name
          price
          category
          image
          longitude
          latitude
          cityId
          city{
            id
            cityCode
            cityName
            thumbnail
            region{
              id
              regionName
            }
          }
          imageEntertainments{
            id
            entertainmentId
            path
          }
        }
        }
        
        
      }
      `
      ,
      variables: {
        "cityId":cityId
      }
    })
  }

  getEntertainmentTicketsByCategory(category:string):Observable<Query>{
    return this.apollo.query<Query>({
      query : gql`
      query entertainmentsTicketsByCategory($category: String){
        entertainmentsTicketsByCategory(category:$category){
          date
          discountPercentage
          
          entertainmentId
          id
          price
          entertainment{
          id
          name
          price
          category
          image
          longitude
          latitude
          cityId
          city{
            id
            cityCode
            cityName
            thumbnail
            region{
              id
              regionName
            }
          }
          imageEntertainments{
            id
            entertainmentId
            path
          }
        }
        }
        
        
      }
      `
      ,
      variables: {
        "category":category
      }
    })
  }

  
  getEntertainmentTicketsByCategoryAndCityId(category:string, cityId:number):Observable<Query>{
    return this.apollo.query<Query>({
      query : gql`
      query entertainmentsTicketsByCategoryAndCityId($category: String, $cityId: Int){
        entertainmentsTicketsByCategoryAndCityId(category:$category, cityId:$cityId){
          date
          discountPercentage
          
          entertainmentId
          id
          price
          entertainment{
          id
          name
          price
          category
          image
          longitude
          latitude
          cityId
          city{
            id
            cityCode
            cityName
            thumbnail
            region{
              id
              regionName
            }
          }
          imageEntertainments{
            id
            entertainmentId
            path
          }
        }
        }
        
        
      }
      `
      ,
      variables: {
        "category":category,
        "cityId": cityId
      }
    })
  }



}
