import { Component, OnInit } from '@angular/core';
import { nationalities } from "./checkout";
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { of } from 'rxjs';
import { Passenger } from 'src/app/models/passenger';
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

  constructor(
    private router: Router

  ) { }
  userNationality: String

  flight: Flight
  quantity: number
  selectedClass: string
  passengers: Passenger[]


  user: User

  title: string
  name: string
  email: string
  nationality: string
  phoneNumber:string


  timerMinutes: number
  timerSeconds: number
  isTimeOut: boolean = false
  ngOnInit() {
    
    if (sessionStorage.getItem("user") != null) {
      // Get User Here!!
      console.log("get user here")
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
    let object = JSON.parse(json)
    this.flight = object.flight
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
  }


  setTimer(): void {
    {
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
  }






}
