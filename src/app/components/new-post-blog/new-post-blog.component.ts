import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { Subscription } from 'rxjs';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-new-post-blog',
  templateUrl: './new-post-blog.component.html',
  styleUrls: ['./new-post-blog.component.scss']
})
export class NewPostBlogComponent implements OnInit {

  constructor(
    private blogService: BlogServiceService
    ,private chatService: ChatServiceService
  ) { }
  title:string=""
  userId:number;
  image:string=""
  ngOnInit() {
    
    let temp =  JSON.parse(sessionStorage.getItem("user"))
    this.userId = temp.id
  }
  initButtons(cmd: any) {

    if (cmd === 'createlink') {
      let url = prompt("Enter the link here: ", "http:\/\/");
      document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, null);
    }
  }
  
  blogService$:Subscription
  post():void{
    if(this.title == ""){
      alert("insert title")
      return
    }
    let temp = document.getElementById("content").innerHTML

    if(this.userId == null){
      alert("must login first")
      return;
    }
    if(this.image == ""){
      alert("please select a picture")
      return
    }
      this.blogService$ = this.blogService.insertPost(this.title,temp, this.userId,this.image).subscribe(m=>{
        alert("success")
        this.emitNewBlog()
        location.reload()
      })
  }


  emitNewBlog():void{
    this.chatService.emit("waitForNewBlog","hehe")
  }
  
  onFileChanged(event){
    
    var reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])
    var a = new Image()
    
    reader.onload= (e)=>{
      this.image = reader.result.toString() //ini reader.result ambil hasil encode gambar, tinggal ditembak ke source sudah bole pake
    } 
  }
}
