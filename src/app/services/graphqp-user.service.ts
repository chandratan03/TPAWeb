import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Query } from '../models/query';




@Injectable({
  providedIn: 'root'
})
export class GraphqpUserService {

  constructor(private apollo: Apollo) {
  }


  getUserById(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query getUser($id: ID!){
        user(id: $id){
          email

          id
          password
        }
      }`,
      variables: {
        "id": id
      }

    })

  }
  getUserByEmail(email: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getUserByEmail($email: String!){
        userByEmail(email: $email){
          email
          firstName
          lastName
          password
          phoneNumber
        }
      }`,
      variables: {
        "email": email
      },

    })
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getUserByEmailAndPassword($email: String!, $password: String!){
          userByEmailAndPassword(email: $email, password: $password){
            email
            firstName
            lastName
            password
            phoneNumber
          }
        }
      `,
      variables: {
        "email": email,
        "password": password
      }
    })
  }

  createUser(firstName: string,
    lastName: string,
    password: string,
    email: string,
    phoneNumber: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
          mutation createUser($firstName: String!, $lastName:String!,$password:String!, $email:String!, $phoneNumber:String!){
            createUser(firstName: $firstName, lastName: $lastName, password: $password, email: $email, phoneNumber: $phoneNumber){
              firstName
              lastName
              email
              password
              phoneNumber
            }
          }
        `,
      variables: {
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "email": email,
        "phoneNumber": phoneNumber
      }
    })
  }

  getHotels(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getHotels{
          hotels{
            id
            hotelName
            rate
            address
            imagePath
            price
            discountPercentage
            quantity
            location{
              id
              city{
                cityName
                region{
                  RegionName
                }
              }
            }
            hotelFacilities{
              id
              hotelId
              facility{
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

  getFlights(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getFlights{
          flights{

            id
           arrival
           departure
           duration
           price
           tax
           
           airline{
             id
             name
             path
           }
           from{
             id
             name
             city{
               cityName
               id
               region{
                 RegionName
                 id
               }
             }
           }
           to{
             id
             name
             city{
               cityName
               id
               region{
                 RegionName
                 id
               }
             }  
           }
            routes{
             id
              to{
               id
               name
               city{
                 cityName
                 id
                 region{
                   RegionName
                   id
                 }
               }  
             }
             from{
               id
               name
               city{
                 cityName
                 id
                 region{
                   RegionName
                   id
                 }
               }
             }
           } 
         }
        }
      `
    })
  }








}
