import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Query } from '../models/query';




@Injectable({
  providedIn: 'root'
})
export class GraphqpUserService {

  constructor(private apollo: Apollo) {
  }


  getUserById(id:number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getUser($id: ID!){
        user(id: $id){
          email
          name
          id
          password
        }
      }`,
      variables: {
        "id" : id
      }

    })
  
  } 
  getUserByEmail(email:string):Observable<Query>{
    return this.apollo.query<Query>({
       query: gql`
        query getUserByEmail($email: String!){
        userByEmail(email: $email){
          email
          name
        }
      }`,
      variables: {
        "email" : email
      }
    })
  
  } 
}
