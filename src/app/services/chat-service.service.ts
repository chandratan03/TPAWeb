import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { subscribe } from 'graphql';
import { Apollo } from 'apollo-angular';
import { Query } from '../models/query';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  socket:any
  readonly uri:string   = 'ws://localhost:2000'
  constructor(
    private apollo: Apollo
  ) {
    this.socket = io(this.uri)
  }

  public listen(eventName:string){
    return new Observable((subscriber) =>{
      this.socket.on(eventName, (data)=>{
        subscriber.next(data)
      })
    })
  }

  public emit(eventName:string, data:any){
    this.socket.emit(eventName, data)
  }



  getAllMessages():Observable<Query>{
    return this.apollo.query<Query>({
      query:gql`   
      {
        allMessages{
          id
          date
          from
          to
          message
          image
        }
      
      
      }
      `
    })
  }

  insertMessages(from:number, to:number, message:string, image:string):Observable<any>{
    return this.apollo.mutate<any>(
      {
        mutation:gql`
        mutation insertMessage($from:Int!, $to:Int!, $message:String, $image:String){
          insertMessage(from:$from, to:$to, message:$message, image:$image){
            id
            date
            from
            to
            message
            image
          }
        }
        `,
        variables:{
          "from":from,
          "to":to,
          "message": message,
          "image": image
        }
      }
    )
  }

}
