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
          description
          terms
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
  getEntertainmentById(id :number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query entertainmentById($id: Int!){
        entertainmentById(id:$id){
          id
          name
          price
          category
          image
          longitude
          latitude
          cityId
          isTrending
          description
          terms
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
      `,
      variables:{
        "id":id,
      }
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
          terms
          description
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
  
  getEntertainmentTicketById(id:number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query entertainmentTicketById($id:Int!){
        entertainmentTicketById(id:$id){
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
          terms
          description
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
      `,
      variables:{
        "id":id
      }
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
          description
          terms
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
            description
          terms
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
            description
          terms
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


  getEntertainmentTicketsByEntertainmentIdAndDate(entertainmentId: number, date:string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query entertainmentsTicketsByEntertainmentIdAndDate($entertainmentId: Int, $date: String){
        entertainmentsTicketsByEntertainmentIdAndDate(entertainmentId:$entertainmentId,date:$date){
          date
          discountPercentage
          description
          entertainmentId
          id
          price
          entertainment{
            description
          terms
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
        "entertainmentId":entertainmentId ,
        "date":date,
      }
    })
  }


  insertEntertainment(name: string, price: number, category: string, isTrending: boolean, cityId: number, image: string, description: string, terms:string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation insertEntertainment($name: String!, $price:Float!, $category:String!, $isTrending:Boolean!, $cityId:Int!, 
          $image:String!, $description:String!, $terms:String!
        ){
          insertEntertainment(name:$name, price:$price, category:$category, isTrending:$isTrending,
            cityId:$cityId, image:$image, description:$description,terms:$terms){
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
        "description": description,
        "terms": terms
      }
    })
  }
  updateEntertainment(id: number, name: string, price: number, category: string, isTrending: boolean, cityId: number, image: string, description: string, terms:string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation updateEntertainment($id:Int!,$name: String!, $price:Float!, $category:String!, $isTrending:Boolean!, $cityId:Int!, 
        $image:String!, $description:String!, $terms:String!
      ){
        updateEntertainmentById(id:$id,name:$name, price:$price, category:$category, isTrending:$isTrending,
          cityId:$cityId, image:$image, description:$description,terms:$terms){
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
        "description": description,
        "terms": terms
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

  deleteEntertainmentTicket( id:number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation deleteEntertainmentTicketById( $id:Int!){
        deleteEntertainmentTicketById(id:$id){
          id
          entertainmentId
        }
      }
      `,
      variables: {
        "id": id,
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
