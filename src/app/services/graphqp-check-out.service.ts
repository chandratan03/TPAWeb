import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqpCheckOutService {

  constructor(
    private apollo: Apollo
  ) { }
  getPromoByCode(code: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query getPromoByCode($code: String){
        promoCodeByCode(code:$code){
          id
          code
          discountPercentage
        }
      }
      `,
      variables: {
        "code": code
      }
    })
  }

  InsertHeaderTransaction(userId:number, title:string, name:string,email:string, nationality: string, phoneNumber:string, bankId:number, bankNumber:string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation : gql`
      mutation insertHeaderTransaction($userId:Int, $title:String, $name:String, $email:String, $nationality: String, $phoneNumber:String, $bankId:Int, $bankNumber:String){
        InsertHeaderTransaction(userId:$userId, title:$title, name:$name, email:$email, nationality:$nationality, phoneNumber:$phoneNumber, bankId:$bankId, bankNumber:$bankNumber){
          id
          date
          id
          userId
      
        }
      }
      `,
      variables:{
        "userId":userId,
        "title": title,
        "name": name, 
        "email":phoneNumber, 
        "nationality": nationality, 
        "phoneNumber":phoneNumber,
        "bankId": bankId,
        "bankNumber":bankNumber
      }
    })
  }

  

  InsertHeaderEvent(userId:number, title:string, name:string,email:string, nationality: string, phoneNumber:string, bankId:number, bankNumber:string, eventPassengers:string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation : gql`
      mutation insertHeaderEvent($userId:Int, $title:String, $name:String, $email:String, $nationality: String, $phoneNumber:String, $bankId:Int, $bankNumber:String, $eventPassengers){
        InsertHeaderEvent(userId:$userId, title:$title, name:$name, email:$email, nationality:$nationality, phoneNumber:$phoneNumber, bankId:$bankId, bankNumber:$bankNumber,passengerEvents:$eventPassengers){
          id
          date
          id
          userId
      
        }
      }      `,
      variables:{
        "userId":userId,
        "title": title,
        "name": name, 
        "email":phoneNumber, 
        "nationality": nationality, 
        "phoneNumber":phoneNumber,
        "bankId": bankId,
        "bankNumber":bankNumber,
        "eventPassengers":eventPassengers,
      }
    })
  }
  InsertDetailTransaction(headerId:number, flightId:number, quantity:number, type:string):Observable<any>{
    return this.apollo.mutate({
      mutation:gql`
      mutation insertDetailTransaction($headerId:Int!, $flightId:Int!, $quantity:Int!, $type:String!){
        insertDetailTransaction(headerId: $headerId, flightId: $flightId, quantity:$quantity, type:$type){
          id
        }
      }
      `,
      variables: {
        "headerId":headerId,
        "flightId":flightId,
        "quantity": quantity,
        "type": type,
      }
    })
  }
  InsertDetailEvent(headerId:number, entertainmentTicketId:number, quantity:number, type:string):Observable<any>{
    return this.apollo.mutate({
      mutation:gql`
      mutation insertDetailEvent($headerId:Int!, $entertainmentTicketId:Int!, $quantity:Int!, $type:String!){
        insertDetailEvent(headerId: $headerId, entertainmentTicketId: $entertainmentTicketId, quantity:$quantity, type:$type){
          id
        }
    }
      `,
      variables: {
        "headerId":headerId,
        "entertainmentTicketId":entertainmentTicketId,
        "quantity": quantity,
        "type": type,
      }
    })
  }
  DeletePromoByCode(code: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation deletePromoByCode($code:String!){
          deletePromoCodeByCode(code :$code){
            id
            discountPercentage
            code
          }
        }
      `,
      variables: {
        "code": code,
      }
    }
    )
  }
  InsertPassenger(name:string, headerId:number, title:string, nationality:string):Observable<any>{
    return this.apollo.mutate({
      mutation:gql`
      mutation insertPassenger($name:String!, $headerId:Int!, $title:String!, $nationality:String!){
        insertPassenger(name:$name, headerId: $headerId, title:$title, nationality:$nationality){
          id
          name
        }
      }
      `,
      variables: {
        "name":name,
        "headerId":headerId,
        "title":title,
        "nationality":nationality
      }
    })
  }
  
}
