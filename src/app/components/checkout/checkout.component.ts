import { Component, OnInit, ɵConsole } from '@angular/core';
import { nationalities } from "./checkout";
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { of, Subscription } from 'rxjs';
import { Passenger } from 'src/app/models/passenger';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { MatStepper, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { GraphqpCheckOutService } from 'src/app/services/graphqp-check-out.service';
import { PromoCode } from 'src/app/models/promo-code';
import { HeaderTransaction } from 'src/app/models/header-transaction';
import { DetailTransaction } from 'src/app/models/detail-transaction';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  nationalities: any = nationalities
  // this.classes = [
  //   "ekonomi",
  //   "premium ekonomi",
  //   "bisnis",
  //   "first",

  // ]

  banks: Bank[]
  banks$: Subscription
  selectedBankId: number
  constructor(
    private router: Router,
    private bankService: BankService,
    private checkOutService: GraphqpCheckOutService,
    private userService: GraphqpUserService
  ) { }
  userNationality: String

  flight: Flight
  quantity: number
  selectedClass: string
  passengers: Passenger[]


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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.banks$.unsubscribe()
  }
  selectBank(i: number) {
    this.bank = this.banks[i]
  }

  ngOnInit() {
    this.titles = [
      "tuan",
      "nyonya",
      "none"
    ]

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

        if(this.user.gender == "male"){
          
          this.title = this.titles[0]
        }else{
          this.title = this.titles[1]
        }
      })
    }
    // let json = {
    //   "flight": flight,
    //   "quantity": quantity,
    //   "selectClass": selectClass
    // }

    if (sessionStorage.getItem("checkoutFlight") == null) {
      alert("please select a flight first")
      this.router.navigateByUrl("/")
    }

    let json = sessionStorage.getItem("checkoutFlight")
    console.log(sessionStorage.getItem('checkoutFlight'))
    let object = JSON.parse(json)
    console.log(object.flight)
    this.flight = object.flight as Flight
    this.selectedClass = object.selectClass
    this.quantity = object.quantity

    if (this.selectedClass == "ekonomi") {
      this.flight.classPrice = 0
    } else if (this.selectedClass == "premium ekonomi") {
      this.flight.classPrice = (this.flight.price * 10 / 100)

    } else if (this.selectedClass == "bisnis") {
      this.flight.classPrice = (this.flight.price * 20 / 100)

    } else if (this.selectedClass == 'first') {
      this.flight.classPrice = (this.flight.price * 30 / 100)

    }

    console.log(this.flight)
    this.flight.total = this.flight.price + this.flight.classPrice - this.flight.tax - this.flight.serviceCharge
    this.flight.total *= this.quantity


    this.passengers = []
    for (let i = 0; i < this.quantity; i++) {
      this.passengers.push(new Passenger())
    }
    this.setTimer()

    this.getBanks()
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

      if (this.passengers[i].nationality == "" || this.passengers[i].nationality == null) {
        alert("please insert passengers nationality")
        return

      }
      if (this.passengers[i].name == "" || this.passengers[i].name == null) {
        alert("please insert passengers name")
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
    if (this.user != null) {
      this.headerTransaction$ = this.checkOutService.InsertHeaderTransaction(this.user.id, this.title, this.name, this.email, this.nationality, this.phoneNumber, this.bank.id, this.bankNumber).subscribe(query => {
        this.headerTransaction = query.data.InsertHeaderTransaction
        console.log(query.data.InsertHeaderTransaction)
        console.log(this.headerTransaction)
        this.insertDetailTransaction()
        for (let i = 0; i < this.passengers.length; i++) {
          this.insertPassenger(this.passengers[i].name, this.headerTransaction.id, this.passengers[i].title, this.passengers[i].nationality)
        }
        if (this.promoCode != null) {
          this.deletePromoCode(this.promoCode.code.toUpperCase())
        }
      })
    } else {
      this.headerTransaction$ = this.checkOutService.InsertHeaderTransaction(0, this.title, this.name, this.email, this.nationality, this.phoneNumber, this.bank.id, this.bankNumber).subscribe(query => {
        this.headerTransaction = query.data.InsertHeaderTransaction
        console.log(query.data.InsertHeaderTransaction)
        console.log(this.headerTransaction)
        this.insertDetailTransaction()
        for (let i = 0; i < this.passengers.length; i++) {
          this.insertPassenger(this.passengers[i].name, this.headerTransaction.id, this.passengers[i].title, this.passengers[i].nationality)
        }
        if (this.promoCode != null) {
          this.deletePromoCode(this.promoCode.code.toUpperCase())
        }
      })
    }
  }

  deletePromoCode(code: string): void {
    this.promoCode$ = this.checkOutService.DeletePromoByCode(code.toUpperCase()).subscribe()
  }
  insertDetailTransaction(): void {
    this.detailTransaction$ = this.checkOutService.InsertDetailTransaction(this.headerTransaction.id, this.flight.id, this.quantity, this.selectedClass).subscribe()
  }
  insertPassenger(name: string, headerId: number, title: string, nationality: string): void {
    this.passenger$ = this.checkOutService.InsertPassenger(name, headerId, title, nationality).subscribe()

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
      this.discount = this.flight.total * this.promoCode.discountPercentage / 100
      this.flight.total -= this.discount
      this.codeIsUsed = true
    })
  }



}







