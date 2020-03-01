import { Component, OnInit, RootRenderer } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntertainmentTicket } from 'src/app/models/entertainment-ticket';
import { Subscription } from 'rxjs';
import { MatSliderChange } from '@angular/material';
import { City } from 'src/app/models/city';
import { Entertainment } from 'src/app/models/entertainment';
import { NullTemplateVisitor } from '@angular/compiler';
import { User } from 'src/app/models/user';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';

@Component({
  selector: 'app-manage-event-page',
  templateUrl: './manage-event-page.component.html',
  styleUrls: ['./manage-event-page.component.scss']
})
export class ManageEventPageComponent implements OnInit {

  constructor(
    private eventService: EventServiceService,
    private router: Router,
    private chatService: ChatServiceService,
    private userService: GraphqpUserService,
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


  cities: City[]
  cities$: Subscription
  city: City

  inputPrice: number = 0
  categories: string[]
  category = ""

  title: string = ""
  description: string = ""
  terms: string = ""

  entertainmentId: number = 0
  entertainment: Entertainment = null
  user: User
  user$: Subscription
  ngOnInit() {
    this.getUser()

    this.chatService.listen('waitForNewEvent').subscribe(msg => {
      alert("NEW EVENT IS COMINGG RELOAD TO SEE THAT")
      console.log('test')
    })
    setTimeout(()=>{
      document.getElementById("loading-page").style.display="none"
    },2000)
  }
  getUser(): void {
    if (sessionStorage.getItem("user") == null) {
      alert("you must be a admin or login first")
      this.router.navigateByUrl('')
    }
    let temp = JSON.parse(sessionStorage.getItem("user"))
    if (temp.isAdmin == false) {
      alert("you must be a admin or login first")
      this.router.navigateByUrl('')

    }
    this.user$ = this.userService.getUserById(temp.id).subscribe(
      q => {
        this.user = q.data.userById
        if (this.user.id != 0) {
          this.categories = [
            "activity",
            "attraction",
            "event"
          ]
          this.getEntertainmentTickets()
          this.getCities()
          this.setModal()
          

        }
        else {
          alert("not valid user")
          this.router.navigateByUrl('')
        }
      }
    )
  }

  emitNewEvent(): void {
    this.chatService.emit("waitForNewEvent", "hehe")
  }



  closePopUp() {
    console.log("helo")
    this.popUpDelete = false
  }


  sureDelete() {
    console.log(this.entertainmentId)
    this.eventService.deleteEntertainment(this.entertainmentId).subscribe()
    this.eventService.deleteEntertainmentTicket(this.entertainmentId).subscribe()
    this.popUpDelete = false
  }
  popUpDelete: boolean = false
  openPopUp(hehe: number) {

    this.entertainmentId = hehe
    this.popUpDelete = true
    console.log(this.entertainmentId)
  }

  save(): void {
    this.description = document.getElementById('description').innerHTML
    this.terms = document.getElementById('terms').innerHTML

    if (this.entertainment == null) {
      this.eventService.insertEntertainment(this.title, this.inputPrice, this.category, false, this.city.id, this.image, this.description, this.terms).subscribe(m => {
        console.log(m.data)
        if (m.data.insertEntertainment.id != 0) {
          alert("SUCCESS INSERT EVENT")
        } else {
          alert("fail")
        }
        let e = m.data.insertEntertainment
        var start = new Date(this.inputStartDate);
        var end = new Date(this.inputEndDate);

        var loop = new Date(start);
        while (loop <= end) {
          console.log(loop);
          this.eventService.insertEntertainmentTicket(
            loop.toString(), e.id, this.inputPrice,
            0
          ).subscribe()
          var newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
        }
        this.emitNewEvent()

        location.reload()

      })
    } else {
      this.eventService.updateEntertainment(this.entertainmentId, this.title, this.inputPrice, this.category, false, this.city.id, this.image, this.description, this.terms).subscribe(m => {
        console.log(m.data)
        let e = this.entertainment
        var start = new Date(this.inputStartDate);
        var end = new Date(this.inputEndDate);

        var loop = new Date(start);
        if (m.data.updateEntertainmentById.id != 0) {
          alert("SUCCESS INSERT EVENT")
        } else {
          alert("fail")
          return
        }
        while (loop <= end) {
          console.log(loop);
          this.eventService.insertEntertainmentTicket(
            loop.toString(), this.entertainmentId, this.inputPrice,
            0
          ).subscribe()
          var newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
        }

        this.emitNewEvent()
        location.reload()
      })

    }


  }

  setModal(): void {

    let modal = document.getElementById("modal")
    let btn = document.getElementById("showForm")
    btn.onclick = () => {
      this.entertainmentId = 0
      this.entertainment = null
      this.title = ""
      this.inputPrice = 0
      this.city = null
      this.category = ""
      let desc = document.getElementById('description')
      let terms = document.getElementById('terms')
      desc.innerHTML = ""
      terms.innerHTML = ""
      this.image = ""

      modal.style.display = "flex"
    }
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none"
      }
    }
  }

  showUpdateModal(i: number) {
    this.entertainmentId = this.entertainmentTickets[i].
      entertainment.id
    // console.log(this.entertainmentTickets[i])
    this.entertainment = this.entertainmentTickets[i].entertainment

    this.title = this.entertainment.name
    this.inputPrice = this.entertainment.price
    this.city = this.entertainment.city

    for (let i = 0; i < this.cities.length; i++) {
      if (this.city.id == this.cities[i].id) {
        this.city = this.cities[i]
        break
      }
    }
    this.category = this.entertainment.category
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i] == this.category) {
        this.category = this.categories[i]
        break
      }
    }
    let desc = document.getElementById('description')
    let terms = document.getElementById('terms')

    desc.innerHTML = this.entertainment.description
    terms.innerHTML = this.entertainment.terms
    this.image = this.entertainment.image

    let modal = document.getElementById("modal")
    modal.style.display = "flex"


  }

  inputStartDate: Date
  inputEndDate: Date
  image: string = ""

  onFileChanged(event) {
    this.image = ""
    var reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])
    var a = new Image()

    reader.onload = (e) => {
      this.image = reader.result.toString() //ini reader.result ambil hasil encode gambar, tinggal ditembak ke source sudah bole pake
    }
  }
  initButtons(cmd: any) {
    document.execCommand(cmd, false, null);

  }



  getCities(): void {
    this.cities$ = this.eventService.getCities().subscribe(q => {
      this.cities = q.data.cities
    })
  }





  getEntertainmentTickets(): void {
    this.allEntertainments$ = this.eventService.getEntertainmentTickets().subscribe(q => {
      this.allEntertainmentTickets = q.data.entertainmentTickets
      for (let i = 0; i < this.allEntertainmentTickets.length; i++) {
        this.allEntertainmentTickets[i].date = new Date(this.allEntertainmentTickets[i].date)
      }
      this.entertainmentTickets = this.allEntertainmentTickets
      // this.thumbnail = this.entertainmentTickets[0].entertainment.city.thumbnail

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


  sortByPriceAsc() {
    this.allEntertainmentTickets.sort((a, b) => a.price - b.price)
    this.validateAllFilter()

  }
  sortByPriceDsc() {

    this.allEntertainmentTickets.sort((a, b) => b.price - a.price)
    this.validateAllFilter()

  }
  sortByRecommended() {
    this.allEntertainmentTickets.sort((a, b) => a.price - b.price)
    this.validateAllFilter()

  }
  sortByNewest() {
    this.allEntertainmentTickets.sort((a, b) => a.date.getDate() - b.date.getDate())
    this.validateAllFilter()

  }



}
