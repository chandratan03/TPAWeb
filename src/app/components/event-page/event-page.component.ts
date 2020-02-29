import { Component, OnInit } from '@angular/core';
import { Entertainment } from 'src/app/models/entertainment';
import { Subscription } from 'rxjs';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {


  entertainments: Entertainment[]
  entertainments$: Subscription


  activityEntertainments: Entertainment[]
  eventEntertainments: Entertainment[]
  attractionEntertainments: Entertainment[]
  bestOfferEntertainments:Entertainment[]



  
  constructor(
    private eventService: EventServiceService
  ) { }
  
  ngOnInit() {
    this.activityEntertainments=[]
    this.eventEntertainments=[]
    this.attractionEntertainments=[]
    this.bestOfferEntertainments=[]
    this.getEntertainments()
  }

  getEntertainments():void{
    this.entertainments$ = this.eventService.getEntertainments().subscribe(q=>{
      this.entertainments = q.data.entertainments
      console.log(this.entertainments)
      this.getActivityEntertainments()
      this.getAttractionEntertainments()
      this.getEventEntertainments()
      this.getBestOfferEntertainments()
    })
  }
  getActivityEntertainments():void{
    for(let i=0; i<this.entertainments.length; i++){
      if(this.entertainments[i].category == "activity" && this.entertainments[i].isTrending == true){
        this.activityEntertainments.push(this.entertainments[i])
        if(this.activityEntertainments.length== 3){
          break
        }
      }
    }
  }
  getAttractionEntertainments():void{
    for(let i=0; i<this.entertainments.length; i++){
      if(this.entertainments[i].category == "attraction" && this.entertainments[i].isTrending == true){
        this.attractionEntertainments.push(this.entertainments[i])
        if(this.attractionEntertainments.length == 3){
          break
        }
      }
    }
  }
  getEventEntertainments():void{
    for(let i=0; i<this.entertainments.length; i++){
      if(this.entertainments[i].category == "event" && this.entertainments[i].isTrending == true){
        this.eventEntertainments.push(this.entertainments[i])
        if(this.eventEntertainments.length == 3){
          break
        }
      }
    }
  }

  getBestOfferEntertainments():void{
    let temp = this.entertainments.sort((n1, n2) => n1.price -n2.price)
    this.bestOfferEntertainments =  temp.slice(0,4)
  }
  


}
