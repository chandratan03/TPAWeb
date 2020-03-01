import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private apollo: Apollo) { }



  getPromos():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      {
        promos{
          id
          name
          image
          availableUntil
          description
          platform
          promoCode
          promoFor
          promoPrice
        }
      }

      `
    })
  }

  GetLatestPromo(): Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      {
        latestPromo{
          id
          name
          image
          availableUntil
          description
          platform
          promoCode
          promoFor
          promoPrice
        }
      }
      `
    })
  }
}
