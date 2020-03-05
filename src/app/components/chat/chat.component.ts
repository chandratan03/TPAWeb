import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { User } from 'src/app/models/user';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatServiceService,
      private userService: GraphqpUserService
      ,private router: Router
      ) { }


  user: User;
  user$:Subscription
  userId:number

  messages$: Subscription
  messages: Message[][]
  messagesToShow: Message[]
  ngOnInit() {
    let temp = JSON.parse(sessionStorage.getItem('user'))
    this.messages= []
    
    if(temp == null||temp.id == null){
      alert("no user ")
      this.router.navigateByUrl("/")
      return
    }else{
      this.getUserById(parseInt(temp["id"]))
    }


  }
  getUserById(id:number):void{
    this.user$ = this.userService.getUserById(id).subscribe(q=>{
      this.user = q.data.userById[0]
      console.log(q.data.userById[0])
      if(this.user == null){
        alert("no user")
      this.router.navigateByUrl("/")
        return
      }
      this.getMessages()
    })
  }

  getMessages():void{
    this.messages$ = this.chatService.getMessagesByUser(this.user.id).subscribe(
      q=>{
        console.log(q.data)
        
        console.log(q.data.messagesByUser)
        let temp = q.data.messagesByUser as Message[]
        let otherIds =[]
        
        console.log(temp)
        for(let i=0; i<temp.length; i++){
          let flag=0;
          for(let j=0; j<otherIds.length; j++){
            if(temp[i].from == otherIds[j]
              || temp[i].to == otherIds[j]
              ) {
                // console.log(otherIds[j])
                flag=1;
                break;
              }
          }
          if(flag==0){
            if(this.userId != temp[i].from){
              otherIds.push(temp[i].to)
            }else if(this.userId != temp[i].to){
              otherIds.push(temp[i].from)
            }
            console.log('test')
          }   
        }
        this.messages= new Array(otherIds.length)
        console.log(otherIds)
        for(let i=0; i<otherIds.length; i++){
          this.messages[i] = new Array()
          for(let j=0; j<temp.length; j++){
            if(otherIds[i] == temp[j].from || otherIds[i] == temp[j].to ){
              this.messages[i].push(temp[j])
            }
          }
          for(let j=0; j<this.messages[i].length; j++){
            this.messages[i][j].date = new Date(this.messages[i][j].date)
          }
          this.messages[i] = this.messages[i].sort((a,b) =>a.date.getDate() - b.date.getDate())
        }
        console.log(this.messages)
        this.messagesToShow = []
        for(let i=0; i<this.messages.length; i++){
          this.messagesToShow.push(this.messages[i][this.messages[i].length-1])
          
        }
        
        for(let i=0; i<this.messagesToShow.length; i++){
          
          
          this.userService.getUserById(this.messagesToShow[i].from).subscribe(q=>{
            this.messagesToShow[i].fromUser= q.data.userById[0]
            }
          ) 
           
          this.userService.getUserById(this.messagesToShow[i].to).subscribe(q=>{
            this.messagesToShow[i].toUser= q.data.userById[0]
            }
          ) 
        }
        console.log(this.messagesToShow)
      }
    )
  }

}
