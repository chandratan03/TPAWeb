import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Subscription } from 'rxjs';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(private blogService: BlogServiceService
    ,private chatService: ChatServiceService,
    private router: Router
    ) { }

  allBlogs: Blog[] =[]
  allBlogs$: Subscription

  blogs: Blog[]=[]
  ngOnInit() {
    this.setModal()
    this.getBlogs()
    document.onscroll = function () {
      if (window.scrollY + window.innerHeight + window.innerHeight * 20 / 100 >= document.body.scrollHeight) {

        this.setData()
      }
    }.bind(this)

    this.chatService.listen('waitForNewBlog').subscribe(msg=>{
      alert("NEW BLOG IS COMINGG RELOAD TO SEE THAT")
      console.log('test')
    })
  }
  

  setModal():void{
    
    let modal = document.getElementById("modal")
    let btn = document.getElementById("showForm")
    btn.onclick =()=>{
      modal.style.display = "flex"
    }
    window.onclick = (event)=>{
      if(event.target == modal){
        modal.style.display=  "none"
      }
    }
  }

  getBlogs():void{
    this.allBlogs$ = this.blogService.getPost().subscribe(q=>{
      this.allBlogs= q.data.blogs
      this.setData()
    })
  }

  from:number = 0;
  setData(): void {
    if (this.from >= this.allBlogs.length) {
      return
    }
    let temp = this.allBlogs.slice(this.from, this.from + 5)
    console.log(temp)
    this.blogs.push(...temp)
    this.from += 5
  }

  toDetailPage(i:number){
    this.router.navigate(['blog/detail',this.blogs[i].id])
  }

}
