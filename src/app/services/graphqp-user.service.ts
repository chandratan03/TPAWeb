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

  getFacilitiesByForObject(forObject: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query getFacilitiesByForObject($forObject: String!){
        facilitiesByForObject(forObject: $forObject){
          id
          name
          imagePath
          forObject
        }
      }
      `,
      variables: {
        "forObject": forObject
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

  getCities(): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getCities{
          cities{
            id
            cityName
            cityCode
            region{
              id
              regionName
            }
          }

      }`
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
            discountPrice
            quantity
            longitude
            latitude
            category
            city{
              id
              cityName
              region{
                id
                regionName
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
            ratings{
              id
              hotelId
              date
              description
              rateScore
            }
            hotelRooms{
              id
              hotelId
              name
              maxGuest
              price
              quantity
              space
              freeWifi
              freeBreakFast
              hotelRoomBeds{
                id
                hotelRoomId
                bed{
                  id
                  bedName
                }
              }
            }
            area{
              areaName
              id
              city{
                id
                cityCode
                cityName
                region{
                  regionName
                  id
                
                }
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
             airlineFacilities{
              id
              facility{
                id
                name
                imagePath
                forObject
              }
            }
           }
           from{
             id
             name
             city{
               cityName
               cityCode
               id
               region{
                 regionName
                 id
               }
             }
           }
           to{
             id
             name
             city{
               cityName
               cityCode
               id
               region{
                 regionName
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
                 cityCode
                 id
                 region{
                   regionName
                   id
                 }
               }  
             }
             from{
               id
               name
               city{
                 cityName
                 cityCode
                 id
                 region{
                   regionName
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

  getFlightsByFromToDate(fromId: number, toId: number, date: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query GetFlightsByFromToDate($fromId: Int, $toId: Int, $date: String){
          flightsByFromToDate(fromId: $fromId, toId:$toId, date:$date){
            id
            arrival
            departure
            duration
            price
            tax
            serviceCharge
            airline{
              id 
              name
              path
              airlineFacilities{
               id
               facility{
                 id
                 name
                 imagePath
                 forObject
               }
             }
            }
            from{
              id
              name
              city{
                cityName
                cityCode
                id
                region{
                  regionName
                  id
                }
              }
            }
            to{
              id
              name
              city{
                cityName
                cityCode
                id
                region{
                  regionName
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
                  cityCode
                  id
                  region{
                    regionName
                    id
                  }
                }  
              }
              from{
                id
                name
                city{
                  cityName
                  cityCode
                  id
                  region{
                    regionName
                    id
                  }
                }
              }
            }
          }
        }
      
      `,
      variables: {
        "fromId": fromId,
        "toId": toId,
        "date": date,
      }

    })
  }







}
