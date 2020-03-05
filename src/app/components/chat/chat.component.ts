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
        this.messages=[]
        console.log(q.data.messagesByUser)
        let temp = q.data.messagesByUser as Message[]
        let temp2 =[]
        for(let i=0; i<temp.length; i++){
          let flag=0
          for(let j=0; j<temp2.length; j++){
            if(temp[i].from !=this.userId){
              if(temp2[j] == temp[i].from ){
                flag=1;
                break
              } 
            }
            if(temp[i].to !=this.userId){
              if(temp2[j] == temp[i].to ){
                flag=2;
                break
              } 
            }
          }
          if(flag==1){
            temp2.push(temp[i].from)
          }else if(flag==2){

            temp2.push(temp[i].to)
          }

        }
        console.log(temp2)
        

        for(let i=0; i<temp2.length; i++){
          this.messages[i] = []
          for(let j=0; j<temp.length; j++){
            if(temp2[i] == temp[i].from ||temp2[i] == temp[i].to  )
              this.messages[i].push(temp[j]);
          }
        }
        console.log(this.messages)

      }

    )
  }

}
