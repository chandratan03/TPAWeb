import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { Router } from '@angular/router';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { BlogServiceService } from 'src/app/services/blog-service.service';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {

  constructor(private blogService: BlogServiceService
    , private chatService: ChatServiceService,
    private router: Router
  ) { }

  allBlogs: Blog[] = []
  allBlogs$: Subscription

  blogs: Blog[] = []


  pageCount:number=0;


  ngOnInit() {
    if(sessionStorage.getItem("user") == null){
      alert("you must be a admin or login first")
      this.router.navigateByUrl('')
    }
    let temp = JSON.parse(sessionStorage.getItem("user"))
    if(temp.isAdmin == false){
      alert("you must be a admin or login first")
      this.router.navigateByUrl('')
      
    }
    
    this.userId = temp.id
    console.log(temp.id)
    console.log(this.userId)
    this.setModal()
    this.getBlogs()
    // document.onscroll = function () {
    //   if (window.scrollY + window.innerHeight + window.innerHeight * 20 / 100 >= document.body.scrollHeight) {

    //     this.setData()
    //   }
    // }.bind(this)
    setTimeout(()=>{
      document.getElementById("loading-page").style.display="none"
    },2000)
    
  }


  title: string = ""
  userId: number;
  image: string = ""
  category: string = ""


  blogId: number
  setModal(): void {

    let modal = document.getElementById("modal")
    let modal2 = document.getElementById("modal2")
    let btn = document.getElementById("showForm")
    btn.onclick = () => {
      modal.style.display = "flex"
    }
    window.onclick = (event) => {
      if (event.target == modal || event.target == modal2) {
        modal.style.display = "none"
        modal2.style.display = "none"
      }
    }
  }

  getBlogs(): void {
    this.allBlogs$ = this.blogService.getPost().subscribe(q => {
      this.allBlogs = q.data.blogs
      this.pageCount = Math.ceil(this.allBlogs.length/10)

      this.setData(0)
    })
  }

  // from: number = 0;
  // setData(): void {
  //   if (this.from >= this.allBlogs.length) {
  //     return
  //   }
  //   let temp = this.allBlogs.slice(this.from, this.from + 10)
  //   console.log(temp)
  //   this.blogs.push(...temp)
  //   this.from += 10
  // }

  toDetailPage(i: number) {
    this.router.navigate(['blog/detail', this.blogs[i].id])
  }

  showUpdateForm(i: number): void {
    let modal2 = document.getElementById("modal2")
    this.title = this.blogs[i].title
    this.image = ""
    this.category = this.blogs[i].category
    modal2.style.display = "flex"
  }
  showDeleteForm(i: number): void {

  }
  initButtons(cmd: any) {

    document.execCommand(cmd, false, null);

  }


  blogService$: Subscription
  post(): void {
    if (this.title == "") {
      alert("insert title")
      return
    }
    let temp = document.getElementById("content").innerHTML
    console.log(this.userId)
    if (this.userId == null) {
      alert("must login first")
      return;
    }
    if (this.image == "") {
      alert("please select a picture")
      return
    }
    this.blogService$ = this.blogService.insertPost(this.title, temp, this.userId, this.image, this.category).subscribe(m => {
      
      if(m.data.insertBlog.id != 0){
        alert("success")
      }else{
        alert("fail")
      }
      this.emitNewBlog()
      location.reload()
    })
    this.chatService.listen('waitForNewBlog').subscribe(msg=>{
      alert("NEW BLOG IS COMINGG RELOAD TO SEE THAT")
      console.log('test')
    })
  }


  emitNewBlog(): void {
    this.chatService.emit("waitForNewBlog", "hehe")
  }

  onFileChanged(event) {

    var reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])
    var a = new Image()

    reader.onload = (e) => {
      this.image = reader.result.toString() //ini reader.result ambil hasil encode gambar, tinggal ditembak ke source sudah bole pake
    }
  }

  closePopUp(){
    console.log("helo")
    this.popUpDelete=false
  }
  
  
  sureDelete(){
    console.log(this.blogId)
    this.blogService.deletePost(this.blogId).subscribe()
    this.popUpDelete=false
  }
  popUpDelete:boolean = false
  openPopUp(hehe: number){

    this.blogId = hehe
    this.popUpDelete=true
    console.log(this.blogId)
  }




  currPage:number = 0;


  nextPage(){
    if(this.currPage == this.pageCount-1)
      return
    this.currPage++
    this.setData(this.currPage)
  }
  prevPage(){
    if(this.currPage!=0){
      this.currPage--
    }
    this.setData(this.currPage)
  }


  setData(i:number):void{
    this.blogs = this.allBlogs.slice(i*5, i*5+5)
  } 



}
