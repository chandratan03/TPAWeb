import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private blogService: BlogServiceService,
    private router: Router) { }
  blogId: number
  blog:Blog
  blog$:Subscription

  blogs:Blog[]
  blogs$:Subscription
  URL:String
  FACEBOOKURL:string  
  WHATSAPPURL:string
  LINEURL: string
  ngOnInit() {
    this.URL = window.location.href
    console.log(this.router.url)
    this.FACEBOOKURL = "https://www.facebook.com/sharer/sharer.php?u="+this.URL;
    this.WHATSAPPURL = "https://api.whatsapp.com/send?text="+this.URL
    this.LINEURL =  "https://social-plugins.line.me/lineit/share?url="+this.URL
    this.blogId = +this.route.snapshot.paramMap.get("id")
    this.getBlogById()
    this.getTrendingBlogs()
  }

  shareFacebook():void{
    window.open(this.FACEBOOKURL, "")
  }
  
  shareLine():void{
    window.open(this.LINEURL, "")
  }
  
  shareWhatsapp():void{
    window.open(this.WHATSAPPURL, "")
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.blog$.unsubscribe()
    this.blogs$.unsubscribe()
  }
  getBlogById():void{
    this.blog$ = this.blogService.getBlogById(this.blogId).subscribe(q=>{
      this.blog = q.data.blogById
      this.blogService.updateBlogViewer(this.blog.id).subscribe()
    })
  }

  getTrendingBlogs():void{
    this.blogs$ = this.blogService.getTrendingBlog().subscribe(
      q=>{
        this.blogs = q.data.trendingBlogs
        console.log(q.data.trendingBlogs)
      }
    )
  }
  toDetailPage(i:number){
    this.router.navigate(['blog/detail',this.blogs[i].id])
  }


}
