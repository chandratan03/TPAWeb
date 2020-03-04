import { Component, OnInit } from '@angular/core';
import { Entertainment } from 'src/app/models/entertainment';
import { Subscription } from 'rxjs';
import { EventServiceService } from 'src/app/services/event-service.service';
import { EntertainmentTicket } from 'src/app/models/entertainment-ticket';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  constructor(
    private eventService:EventServiceService,
    private route:ActivatedRoute,
    private router:Router
  ) { }


  entertainment:Entertainment
  entertainment$:Subscription
  
  imageShows: boolean[]
  date:Date
  tickets:EntertainmentTicket
  tickets$:Subscription

  getEntertainmentTicketByEntertainmentIdAndDate(id:number, date:string){
    console.log(id, date)
    this.tickets$ = this.eventService.getEntertainmentTicketsByEntertainmentIdAndDate(id,date).subscribe(q=>{
      this.tickets = q.data.entertainmentsTicketsByEntertainmentIdAndDate
      console.log(q.data)
    })
  }
  ngOnInit() {
    let id=+ this.route.snapshot.paramMap.get("id")
    this.getEntertainmentById(id)
    
  }

  searchTicket():void{
    if(this.date  == null){
      alert("not choosing date yet")
      return;
    }
    this.getEntertainmentTicketByEntertainmentIdAndDate(this.entertainment.id, this.date.toString())
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.entertainment$.unsubscribe()
  }

  getEntertainmentById(id:number){
    this.entertainment$ = this.eventService.getEntertainmentById(id).subscribe(q=>{
      this.entertainment = q.data.entertainmentById
      console.log(q.data)
      
      this.entertainment.imageEntertainments =this.entertainment.imageEntertainments.slice(0,6)
      this.imageShows = Array(this.entertainment.imageEntertainments.length)
      this.imageLength = this.imageShows.length
      
      for(let i=0; i<this.imageShows.length; i++){
        this.imageShows[i] = false
       }
       this.imageShows[0] = true;
      console.log(this.entertainment.imageEntertainments)

    })
  }

  
  isShowImageSlide: boolean = false;
  prevNextClicked = 0;
  showImageSlide():void{
    if (this.prevNextClicked == 1){
      this.prevNextClicked = 0
      return
    }
    this.isShowImageSlide = !this.isShowImageSlide
    this.prevNextClicked=0;

  }
  indexImg:number =0
  imageLength:number=0
  prev(): void{
    this.prevNextClicked=1
    if(this.indexImg ==0){
      this.imageShows[this.indexImg] = false
      this.indexImg = this.imageLength-1
      this.imageShows[this.indexImg] = true
    }else{
      this.imageShows[this.indexImg] = false
      this.indexImg--;
      this.imageShows[this.indexImg] = true
    }
  }
  next(): void{
    this.prevNextClicked=1;
    if(this.indexImg == this.imageLength-1){
      this.imageShows[this.indexImg] = false
      this.indexImg = 0
      this.imageShows[this.indexImg] = true
    }else{
      this.imageShows[this.indexImg] = false
      this.indexImg++;
      this.imageShows[this.indexImg] = true
    }
  } 
  theImage():void{
    this.prevNextClicked=1
  }

  quantity: number = 0
  checkout(i:number):void{
    if(this.quantity==0){
      alert("please insert quantity")
      return
    }
    let id = this.tickets[i].id
    this.router.navigateByUrl("event/order/"+id+"/"+this.quantity)
    
    
  } 

} 
