import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import { getOperationAST } from 'graphql';




@Injectable({
  providedIn: 'root'
})
export class GraphqpUserService {

  constructor(private apollo: Apollo) {
  }


  getUser(id:number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getUser($id: ID!){
        user(id: $id){
          name
        }
      }`,
      variables: {
        "id" : id
      }

    })
  
  } 
}
