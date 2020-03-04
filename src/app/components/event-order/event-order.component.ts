import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { Router, ActivatedRoute } from '@angular/router';
import { BankService } from 'src/app/services/bank.service';
import { GraphqpCheckOutService } from 'src/app/services/graphqp-check-out.service';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { User } from 'src/app/models/user';
import { PromoCode } from 'src/app/models/promo-code';
import { HeaderTransaction } from 'src/app/models/header-transaction';
import { DetailTransaction } from 'src/app/models/detail-transaction';
import { nationalities } from './checkout';
import { MatStepper } from '@angular/material';
import { Entertainment } from 'src/app/models/entertainment';
import { EntertainmentTicket } from 'src/app/models/entertainment-ticket';
import { EventPassenger } from 'src/app/models/event-passenger';
import { EventServiceService } from 'src/app/services/event-service.service';
@Component({
  selector: 'app-event-order',
  templateUrl: './event-order.component.html',
  styleUrls: ['./event-order.component.scss']
})
export class EventOrderComponent implements OnInit {

  nationalities: any = nationalities


  banks: Bank[]
  banks$: Subscription
  selectedBankId: number
  constructor(
    private router: Router,
    private bankService: BankService,
    private checkOutService: GraphqpCheckOutService,
    private userService: GraphqpUserService,
    private route: ActivatedRoute,
    private eventService: EventServiceService
  ) { }
  userNationality: String

  quantity: number
  selectedClass: string
  passengers: EventPassenger[]


  user: User
  user$: Subscription


  title: string
  name: string
  email: string
  nationality: string
  phoneNumber: string


  timerMinutes: number
  timerSeconds: number
  isTimeOut: boolean = false

  promoCodePrice: number


  titles: string[]

  promoCode: PromoCode

  code: string
  codeIsUsed: boolean = false

  promoCode$: Subscription
  bankNumber: string
  discount: number = 0;

  bankIndex: number
  bank: Bank
  isOpen: boolean = false;
  //SUBSCRIBE
  headerTransaction: HeaderTransaction
  detailTransaction: DetailTransaction
  headerTransaction$: Subscription
  detailTransaction$: Subscription
  passenger$: Subscription
  entertainmentTicket$: Subscription
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.banks$.unsubscribe()
  }
  selectBank(i: number) {
    this.bank = this.banks[i]
  }

  entertainmentTicketId: number
  ngOnInit() {
    this.entertainmentTicketId = +this.route.snapshot.paramMap.get("id")
    this.quantity = + this.route.snapshot.paramMap.get("qty")
    this.titles = [
      "tuan",
      "nyonya",
      "none"
    ]
    setTimeout(()=>{
      document.getElementById("loading-page").style.display="none"
    },2000)


    this.selectedBankId = -1
    if (sessionStorage.getItem("user") != null) {
      // Get User Here!!
      let user = JSON.parse(sessionStorage.getItem("user"))
      console.log("get user here")
      console.log(user["id"])
      this.user$ = this.userService.getUserById(user["id"]).subscribe(q => {
        this.user = q.data.userById[0]
        console.log(this.user)
        this.name = this.user.firstName + " " + user.lastName
        this.email = this.user.email
        this.phoneNumber = this.user.phoneNumber
        this.nationality = this.user.nationality

        if (this.user.gender == "male") {

          this.title = this.titles[0]
        } else {
          this.title = this.titles[1]
        }

        console.log(this.quantity)
        this.passengers = []
        // console.log(this.passengers.length)

        for (let i = 0; i < this.quantity; i++) {
          let passenger = new EventPassenger()
          passenger.name = ""
          passenger.email =""
          passenger.title = ""
          passenger.phonenumber = ""
          this.passengers.push(passenger)
        }
        console.log(this.passengers)
      })
    }
    this.setModal()
    this.setTimer()

    this.getBanks()

    this.getEntertainmentTicket()

  }


  setModal():void{
    
    let modal = document.getElementById("modal")
    window.onclick = (event)=>{
      if(event.target == modal){
        modal.style.display=  "none"
      }
    }
  }

  showModal():void{
    console.log("test")
    let modal = document.getElementById("modal")
    modal.style.display="flex"
  }

  getEntertainmentTicket(): void {
    this.entertainmentTicket$ = this.eventService.getEntertainmentTicketById(this.entertainmentTicketId).subscribe(q => {
      this.entertainmentTicket = q.data.entertainmentTicketById
      console.log(q.data.entertainmentTicketById)
    })
  }


  setTimer(): void {
    this.timerMinutes = 29
    this.timerSeconds = 59

    setInterval(() => {
      this.timerSeconds -= 1
      if (this.timerSeconds == -1) {
        this.timerSeconds = 59
        this.timerMinutes--
      }
      if (this.timerMinutes < 0) {
        this.isTimeOut = true
        clearInterval()
      }

    }, 1000)
  }

  getBanks(): void {
    this.banks$ = this.bankService.getBanks().subscribe(query => {
      this.banks = query.data.banks
    })
  }

  goNextStep(stepper: MatStepper): void {
    if (this.title == "" || this.title == null) {
      alert("please insert title")
      return
    }
    if (this.name == "" || this.name == null) {
      alert("please insert name")
      return
    }
    if (this.email == "" || this.email == null) {

      alert("please insert email")
      return
    }
    if (this.nationality == "" || this.nationality == null) {
      alert("please insert your nationality")
      return
    }
    if (this.phoneNumber == "" || this.phoneNumber == null) {
      alert("please insert your phoneNumber")
      return
    }

    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i].title == "" || this.passengers[i].title == null) {
        alert("please insert passengers title")
        return
      }

      if (this.passengers[i].name == "" || this.passengers[i].name == null) {
        alert("please insert passengers name")
        return

      }

      if (this.passengers[i].phonenumber == "" || this.passengers[i].phonenumber == null) {
        alert("please insert passengers phonenumber")
        return

      }
      if (this.passengers[i].email == "" || this.passengers[i].email == null) {
        alert("please insert passengers email")
        return
      }
    }

    this.isOpen = true
    setTimeout(() => {
      this.isOpen = false
      stepper.next()
    }, 3000)
  }

  checkOut(): void {
    if (this.bank == null) {
      alert("No selected bank")
      return
    }
    if (this.bankNumber == "" || this.bankNumber == null) {
      alert("insert bank number")
      return
    }

    // if(this.bank !=null){
    //   console.log(this.bank)
    //   return
    // }
    this.insertHeaderTransaction()
  }

  insertHeaderTransaction(): void {
    let json = JSON.stringify(this.passengers)
    console.log("helo")
    console.log(this.user.id, this.title, this.name, this.email, this.nationality, this.bank.id, this.bankNumber)
    if (this.user != null) {
      this.headerTransaction$ = this.checkOutService.InsertHeaderEvent(this.user.id, this.title, this.name, this.email, this.nationality, this.phoneNumber, this.bank.id, this.bankNumber, json).subscribe(query => {
        this.headerTransaction = query.data.InsertHeaderEvent
        console.log(query.data)
        console.log(query.data.insertHeaderEvent)
        console.log(this.headerTransaction)
        this.insertDetailTransaction()

        if (this.promoCode != null) {
          this.deletePromoCode(this.promoCode.code.toUpperCase())
        }
        if(this.headerTransaction.id != 0){
          alert("success")
        }else{
          alert("fail")
        }
      })
    } else {
      this.headerTransaction$ = this.checkOutService.InsertHeaderEvent(0, this.title, this.name, this.email, this.nationality, this.phoneNumber, this.bank.id, this.bankNumber, json).subscribe(query => {
        this.headerTransaction = query.data.InsertHeaderEvent
        console.log(query.data.InsertHeaderTransaction)
        console.log(this.headerTransaction)
        this.insertDetailTransaction()

        if (this.promoCode != null) {
          this.deletePromoCode(this.promoCode.code.toUpperCase())
        }
        if(this.headerTransaction.id != 0){
          alert("success")
        }else{
          alert("fail")
        }
      })
    }
  }
  entertainmentTicket: EntertainmentTicket
  insertDetailTransaction(): void {
    console.log("ASDASDAS")
    console.log(this.headerTransaction.id,this.entertainmentTicket.id,this.quantity,this.entertainmentTicket.entertainment.category)
    this.detailTransaction$ = this.checkOutService.InsertDetailEvent(this.headerTransaction.id, this.entertainmentTicket.id, this.quantity, this.entertainmentTicket.entertainment.category).subscribe()
  }

  deletePromoCode(code: string): void {
    this.promoCode$ = this.checkOutService.DeletePromoByCode(code.toUpperCase()).subscribe()
  }

  usePromoCode(): void {
    if (this.codeIsUsed == true) {
      alert("YOU ALREADY USING A PROMO CODE!")
      return
    }
    if (this.code == null || this.code == "") {
      alert("insert your promo code first")
      console.log(this.code)
      return
    }
    if (this.code.trim() == "") {
      alert("insert your promo code first")
      return
    }
    this.findPromoCode(this.code.toUpperCase())
  }

  findPromoCode(code: string) {
    this.promoCode$ = this.checkOutService.getPromoByCode(code).subscribe(query => {
      this.promoCode = query.data.promoCodeByCode
      // this.discount = this.flight.total * this.promoCode.discountPercentage / 100
      // this.flight.total -= this.discount
      this.codeIsUsed = true
    })
  }


}
