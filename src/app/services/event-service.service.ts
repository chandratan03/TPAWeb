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

  getEntertainmentTickets(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
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
  getEntertainmentTicketsByCityId(cityId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
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
        "cityId": cityId
      }
    })
  }

  getEntertainmentTicketsByCategory(category: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
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
        "category": category
      }
    })
  }


  getEntertainmentTicketsByCategoryAndCityId(category: string, cityId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
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
        "category": category,
        "cityId": cityId
      }
    })
  }



  insertEntertainment(name: string, price: number, category: string, isTrending: boolean, cityId: number, image: string, description: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation insertEntertainment($name: String!, $price:Float!, $category:String!, $isTrending:Boolean!, $cityId:Int!, 
          $image:String!, $description:String!
        ){
          insertEntertainment(name:$name, price:$price, category:$category, isTrending:$isTrending,
            cityId:$cityId, image:$image, description:$description){
            id
            name
          }
        }
      
      `,
      variables: {
        "name": name,
        "price": parseFloat(price.toString()),
        "category": category,
        "isTrending": isTrending,
        "cityId": cityId,
        "image": image,
        "description": description
      }
    })
  }
  updateEntertainment(id: number, name: string, price: number, category: string, isTrending: boolean, cityId: number, image: string, description: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation updateEntertainment($id:Int!,$name: String!, $price:Float!, $category:String!, $isTrending:Boolean!, $cityId:Int!, 
        $image:String!, $description:String!
      ){
        updateEntertainmentById(id:$id,name:$name, price:$price, category:$category, isTrending:$isTrending,
          cityId:$cityId, image:$image, description:$description){
           id
          name
        }
      }
      
      `,
      variables: {
        "id": id,
        "name": name,
        "price": parseFloat(price.toString()),
        "category": category,
        "isTrending": isTrending,
        "cityId": cityId,
        "image": image,
        "description": description
      }
    })
  }
  deleteEntertainment(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation deleteEntertainment($id:Int!){
        deleteEntertainmentById(id:$id){
          id
          name
        }
      }
      
      `,
      variables: {
        "id": id,
      }
    })
  }

  insertEntertainmentTicket(date: string, entertainmentId:number, price:number, discountPercentage:number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      
        mutation insertEntertainmentTicket($date:String!, $entertainmentId:Int!, $price: Float!, $discountPercentage:Int!){
          insertEntertainmentTicket(date:$date, entertainmentId:$entertainmentId, price:$price, discountPercentage:$discountPercentage){
            id
            entertainmentId
          }
        }
      
      `,
      variables: {
        "date":date,
        "entertainmentId": entertainmentId,
        "price": price,
        "discountPercentage": discountPercentage
      }
    })
  }

  deleteEntertainmentTicket( entertainmentId:number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation deleteEntertainmentTicketById( $entertainmentId:Int!){
        deleteEntertainmentTicketById(entertainmentId:$entertainmentId){
          id
          entertainmentId
        }
      }
      `,
      variables: {
        "entertainmentId": entertainmentId,
      }
    })
  }
  
  getCities(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query getCities{
        cities{
          id
          cityName
          cityCode
          longitude
          latitude
          region{
            id
            regionName
          }
        }
      }
      `
    })
  }





}
