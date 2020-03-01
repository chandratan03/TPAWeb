import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { ActivatedRoute } from '@angular/router';
import { EntertainmentTicket } from 'src/app/models/entertainment-ticket';
import { Subscription } from 'rxjs';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-manage-event-page',
  templateUrl: './manage-event-page.component.html',
  styleUrls: ['./manage-event-page.component.scss']
})
export class ManageEventPageComponent implements OnInit {

  constructor(
    private eventService: EventServiceService,
    
  ) {

  }

  endDate: Date
  startDate: Date
  entertainmentTickets: EntertainmentTicket[]

  activitiesBoolean: Boolean = false
  activitiesBoolean2: Boolean = false


  attractionsBoolean: Boolean = false
  attractionsBoolean2: Boolean = false

  eventsBoolean: Boolean = false
  eventsBoolean2: Boolean = false

  allEntertainmentTickets: EntertainmentTicket[]
  allEntertainments$: Subscription
  thumbnail: string

  sliderPrice: number = 0
  slided: boolean
  maxPrice: number = 0

  ngOnInit() {
    
      
    this.getEntertainmentTickets()
    
    
  }

  getEntertainmentTickets(): void {
    this.allEntertainments$ = this.eventService.getEntertainmentTickets().subscribe(q => {
      this.allEntertainmentTickets = q.data.entertainmentTickets
      for (let i = 0; i < this.allEntertainmentTickets.length; i++) {
        this.allEntertainmentTickets[i].date = new Date(this.allEntertainmentTickets[i].date)
      }
      this.entertainmentTickets = this.allEntertainmentTickets
      this.thumbnail =this.entertainmentTickets[0].entertainment.city.thumbnail

      for (let i = 0; i < this.entertainmentTickets.length; i++) {
        if (this.entertainmentTickets[i].price > this.maxPrice) {
          this.maxPrice = this.entertainmentTickets[i].price
        }
      }
    })
  }
  
  initSliderPrice(event: MatSliderChange) {
    this.sliderPrice = event.value
    this.slided = true
    this.validateAllFilter()
  }

  markActivities() {
    this.activitiesBoolean = !this.activitiesBoolean
    this.validateAllFilter()
  }
  markAttractions() {
    this.attractionsBoolean = !this.attractionsBoolean
    this.validateAllFilter()
  }
  markEvents() {
    this.eventsBoolean = !this.eventsBoolean
    this.validateAllFilter()
  }
  validateAllFilter() {
    this.entertainmentTickets = []
    this.validateActivities()
    this.validateAttractions()
    this.validateEvents()
    this.validateSliderPrice()
    this.validateDate()
  }
  validateActivities() {
    if (this.activitiesBoolean == false) {
      this.entertainmentTickets.push(...this.allEntertainmentTickets)
      return
    }
    for (let i = 0; i < this.allEntertainmentTickets.length; i++) {
      if (this.allEntertainmentTickets[i].entertainment.category == "activity") {
        // console.log(i)
        this.entertainmentTickets.push(this.allEntertainmentTickets[i])
      }
    }
  }

  searchByDate(): void {
    this.validateAllFilter()
  }

  validateAttractions(): void {
    if (this.attractionsBoolean == false) {
      return
    }
    // console.log(this.allEntertainmentTickets.length + "HEH")
    // console.log(this.allEntertainmentTickets.length)
    let temp = []
    for (let i = 0; i < this.entertainmentTickets.length; i++) {
      if (this.entertainmentTickets[i].entertainment.category == "attraction") {
        temp.push(this.entertainmentTickets[i])
      }
    }
    this.entertainmentTickets = temp
  }

  validateEvents(): void {
    if (this.eventsBoolean == false) {
      return
    }
    let temp = []
    for (let i = 0; i < this.entertainmentTickets.length; i++) {
      if (this.entertainmentTickets[i].entertainment.category == "event") {
        temp.push(this.entertainmentTickets[i])
      }
    }
    this.entertainmentTickets = temp
  }

  validateSliderPrice(): void {
    if (this.slided == false) {
      return
    }
    let temp = []

    for (let i = 0; i < this.entertainmentTickets.length; i++) {
      if (this.sliderPrice < this.entertainmentTickets[i].price) {
        temp.push(this.entertainmentTickets[i])
      }
    }
    this.entertainmentTickets = temp
  }
  validateDate(): void {
    if (this.startDate == null) {
      return
    }
    if (this.startDate != null && this.endDate != null) {
      if (this.startDate < this.endDate) {
        let temp = []
        console.log("Halo")
        for (let i = 0; i < this.entertainmentTickets.length; i++) {
          if (this.entertainmentTickets[i].date.getDate() >= this.startDate.getDate()
            && this.entertainmentTickets[i].date.getDate() <= this.endDate.getDate()
          ) {
            temp.push(this.entertainmentTickets[i])
          }
        }
        this.entertainmentTickets = temp
      }
    } else {

      if (this.startDate != null) {
        let temp = []
        for (let i = 0; i < this.entertainmentTickets.length; i++) {
          if (this.entertainmentTickets[i].date.getDate() == this.startDate.getDate()) {
            temp.push(this.entertainmentTickets[i])
          }
        }
        this.entertainmentTickets = temp
      }

    }


    // if (this.startDate > this.endDate)
  }


  sortByPriceAsc(){
    this.allEntertainmentTickets.sort((a,b) =>a.price - b.price)
    this.validateAllFilter()

  }
  sortByPriceDsc(){

    this.allEntertainmentTickets.sort((a,b) =>b.price - a.price)
    this.validateAllFilter()

  }
  sortByRecommended(){
    this.allEntertainmentTickets.sort((a,b) =>a.price - b.price)
    this.validateAllFilter()
    
  }
  sortByNewest(){
    this.allEntertainmentTickets.sort((a,b) =>a.date.getDate() - b.date.getDate())
    this.validateAllFilter()

  }



}
