import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(private service: ChatServiceService,
    private userService: GraphqpUserService,
    private router: Router
    ) { }
  // messageForReceive: Message
  message:string=""
  messages: Message[] = []
  user: User
  
  messages$: Subscription
  sendMessage$: Subscription
  user$:Subscription

  ngOnInit() {
    this.messages$ = this.service.getAllMessages().subscribe(query=>{
      this.messages = query.data.allMessages
      console.log(this.messages)
      for(let i=0; i<this.messages.length; i++){
        this.messages[i].date = new Date(this.messages[i].date)
        console.log(this.messages[i].date.getHours())
        this.user$ = this.userService.getUserById(this.messages[i].from).subscribe(
          mutate => {
            this.messages[i].fromUser =mutate.data.userById[0]
            // this.user$.unsubscribe()
            console.log(mutate.data.userById)
          }
        )        
        this.user$ = this.userService.getUserById(this.messages[i].to).subscribe(
          mutate => {
            this.messages[i].toUser =mutate.data.userById[0]
            // this.user$.unsubscribe()
          }
        )
      }
    })
    this.user=  JSON.parse(sessionStorage.getItem("user"))
    if(this.user == null){
      this.router.navigateByUrl("/")
    }
    console.log(this.user)
    this.service.listen('chat').subscribe(msg=>{
      // this.messageForReceive =  new Message()
      // this.messageForReceive.message = msg+""
      // this.messageForReceive.type = "receive"
      let json = JSON.parse(msg+"")
      let user = json["user"] as User
      let temp = json["msg"]
      
      let message = new Message()

      message.from = user.id
      message.fromUser=user as User
      message.to = this.user.id
      message.toUser=this.user
      message.message = temp
      message.date = new Date(Date.now())
      // message.Date.getM


      this.messages.push(message)
      this.sendMessage$= this.service.insertMessages(message.from, message.to, message.message).subscribe()
      
      // temp = user.firstName+  " "+user.lastName+": "+temp

      // this.messages.push(temp)
    })
  }
  send():void{

    if(this.message.trim()==""){
      alert("please input message first")
      return;
    }
    var json = {
      "user": this.user,
      "msg": this.message
    }

    this.service.emit('chat', JSON.stringify(json))
    
    this.message= null
  }

  file:any
  onFileChanged(event) {
    this.file = event.target.files[0]
  }




}
