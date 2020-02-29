import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private apollo: Apollo) { }
  getBanks(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query {
        banks{
          id
          name  
        }
      }
      `
    })
  }
}
