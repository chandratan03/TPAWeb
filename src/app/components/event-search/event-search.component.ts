import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { Entertainment } from 'src/app/models/entertainment';
import { Subscription } from 'rxjs';
import { EntertainmentTicket } from 'src/app/models/entertainment-ticket';
import { MatSliderChange } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss']
})
export class EventSearchComponent implements OnInit {

  constructor(
    private eventService: EventServiceService,
    private route: ActivatedRoute,
    private router: Router
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

  goToDetail(i:number){
    let id= this.entertainmentTickets[i].id
    this.router.navigateByUrl("event/detail/"+id);
  }
  ngOnInit() {
    
    let category = this.route.snapshot.paramMap.get("category")
    console.log(category)
    let id = +this.route.snapshot.paramMap.get("id")
    console.log(id)
    if(category == null && id == 0){
      console.log("he")
      this.getEntertainmentTickets()
    }else if(category == "semua" && id== 0){
      console.log("he")
      this.getEntertainmentTickets()
    }else if(category == "semua" && id!=0){
      console.log("he")
      this.getEntertainmentTicketsByCityId(id)
    }else if(category !=null && id==0){
      console.log("he")
      this.getEntertainmentTicketsByCategory(category)
    }else if(category == null && id!=0){
      this.getEntertainmentTicketsByCityId(id)
    }
    else{
      console.log("he")
      this.getEntertainmentTicketsByCategoryAndCityId(category, id)
    }
    
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
  getEntertainmentTicketsByCategory(category: string): void {
    this.allEntertainments$ = this.eventService.getEntertainmentTicketsByCategory(category).subscribe(q => {
      this.allEntertainmentTickets = q.data.entertainmentsTicketsByCategory
      for (let i = 0; i < this.allEntertainmentTickets.length; i++) {
        this.allEntertainmentTickets[i].date = new Date(this.allEntertainmentTickets[i].date)
      }
      this.entertainmentTickets = this.allEntertainmentTickets

     this.thumbnail= this.entertainmentTickets[0].entertainment.city.thumbnail


      for (let i = 0; i < this.entertainmentTickets.length; i++) {
        if (this.entertainmentTickets[i].price > this.maxPrice) {
          this.maxPrice = this.entertainmentTickets[i].price
        }
      }
    })
  }
  
  getEntertainmentTicketsByCategoryAndCityId(category:string, cityId:number): void {
    this.allEntertainments$ = this.eventService.getEntertainmentTicketsByCategoryAndCityId(category, cityId).subscribe(q => {
      this.allEntertainmentTickets = q.data.entertainmentsTicketsCategoryAndByCityId
      for (let i = 0; i < this.allEntertainmentTickets.length; i++) {
        this.allEntertainmentTickets[i].date = new Date(this.allEntertainmentTickets[i].date)
      }
      this.entertainmentTickets = this.allEntertainmentTickets

      this.thumbnail= this.entertainmentTickets[0].entertainment.city.thumbnail


      for (let i = 0; i < this.entertainmentTickets.length; i++) {
        if (this.entertainmentTickets[i].price > this.maxPrice) {
          this.maxPrice = this.entertainmentTickets[i].price
        }
      }
    })
  }
  
  getEntertainmentTicketsByCityId(cityId:number): void {
    this.allEntertainments$ = this.eventService.getEntertainmentTicketsByCityId(cityId).subscribe(q => {
      this.allEntertainmentTickets = q.data.entertainmentsTicketsByCityId
      for (let i = 0; i < this.allEntertainmentTickets.length; i++) {
        this.allEntertainmentTickets[i].date = new Date(this.allEntertainmentTickets[i].date)
      }
      this.entertainmentTickets = this.allEntertainmentTickets

      this.thumbnail=this.entertainmentTickets[0].entertainment.city.thumbnail


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
