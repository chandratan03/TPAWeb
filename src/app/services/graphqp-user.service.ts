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

  subcribeEmail(email:string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query sendEmail($email:String){   
        sendEmail(toEmail:$email)
      }
      `,
      variables:{
        "email":email
      }
    })
  }

  getUserById(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
      query getUser($id: Int!){
        userById(id: $id){
          
          firstName
          lastName
          phoneNumber
          email
          id
          address
          gender
          nationality
          emailVerified
          phoneVerified
          language
          isAdmin
          facebookId
          googleId
          city{
            cityCode
            cityName
            id
            region{
              regionName

              id
            }

          }
          cityId
          postCode   }
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
          firstName
            lastName
            phoneNumber
            email
            gender
            id
            address
            language
            isAdmin
            city{
              cityCode
              cityName
              id
              region{
                regionName

                id
              }

            }
            cityId
            postCode   
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

  connectUserToFacebook(id: number, facebookId: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation connectUserToFacebook($id:Int!, $facebookId:String!){
        connectUserToFacebook(id:$id, facebookId:$facebookId){
          id
        }
      }
      `,
      variables: {
        'id': id,
        "facebookId": facebookId
      }
    })
  }


  connectUserToGoogle(id: number, googleId: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation connectUserToGoogle($id:Int!, $googleId:String!){
        connectUserToGoogle(id:$id, googleId:$googleId){
          id
        }
      }
      `,
      variables: {
        'id': id,
        "googleId": googleId
      }
    })
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<Query> {
    return this.apollo.query<Query>({
      query: gql`
        query getUserByEmailAndPassword($email: String!, $password: String!){
          userByEmailAndPassword(email: $email, password: $password){
            firstName
            lastName
            phoneNumber
            email
            id
            address
            gender
            language
            isAdmin
            city{
              cityCode
              cityName
              id
              region{
                regionName

                id
              }

            }
            cityId
            postCode   
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
    phoneNumber: string, nationality: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation createUser($firstName: String!, $lastName:String!,$password:String!, $email:String!, $phoneNumber:String!, $nationality:String!){
        createUser(firstName: $firstName, lastName: $lastName, password: $password, email: $email, phoneNumber: $phoneNumber, nationality:$nationality){
          id
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
        "phoneNumber": phoneNumber,
        "nationality": nationality
      }
    })
  }
  createUserFacebook(firstName: string,
    lastName: string,
    email: string,
    facebookId: string
  ): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation createUser($firstName: String!, $lastName:String!, $email:String!, $facebookId:String!){
        createUserWithFacebook(firstName: $firstName, lastName: $lastName, email: $email,facebookId:$facebookId){
          id
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
        "email": email,
        "facebookId": facebookId
      }
    })
  }

  createUserGoogle(firstName: string,
    lastName: string,
    email: string,
    googleId: string
  ): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation createUser($firstName: String!, $lastName:String!, $email:String!, $googleId:String!){
        createUserWithGoogle(firstName: $firstName, lastName: $lastName, email: $email,googleId:$googleId){
          id
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
        "email": email,
        "googleId": googleId
      }
    })
  }

  updateUserById(id: number, firstName: string,
    lastName: string, email: string, phoneNumber: string,
    nationality: string, address: string, cityId: number,
    postCode: string, gender: string, language: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation updateUserById($id:Int!, $firstName:String!,
          $lastName:String!, $email:String!, $phoneNumber:String!,
          $nationality:String!, $address:String!, $cityId:Int!, 
          $postCode:String!, $gender:String!, $language:String!
        ){
          UpdateUserById(id:$id, firstName:$firstName,
            lastName:$lastName, email:$email,
            phoneNumber:$phoneNumber, nationality:$nationality,
            address:$address, cityId:$cityId, postCode:$postCode,
            gender:$gender, language:$language
            
          ){
            id
          }
        }
        `,
      variables: {
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
        "nationality": nationality,
        "address": address,
        "cityId": cityId,
        "postCode": postCode,
        "gender": gender,
        "language": language,
      }
    })
  }


  updateEmailVerified(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateVerifiedEmail($id:Int!){
          updateVerifiedEmail(id:$id){
            id
          }
        }
      `, variables: {
        "id": id
      }
    })
  }
  updatePhoneVerified(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateVerifiedPhone($id:Int!){
          updateVerifiedPhone(id:$id){
            id
          }
        }
      `
      , variables: {
        "id": id
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
