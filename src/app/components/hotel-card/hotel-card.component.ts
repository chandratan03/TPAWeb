import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {

  constructor(public myService: GraphqpUserService,
    private router:Router
    ) { }
  cities: City
  cities$: Subscription
  destination: number
  checkInDate: Date
  checkOutDate: Date
  quantityRoom: number
  quantityGuest: number
  ngOnInit() {
    this.getCities()
  }
  getCities(): void {
    sessionStorage.removeItem("hotelQuery")
    this.cities$ = this.myService.getCities().subscribe(query => {
      this.cities = query.data.cities
    })
  }
  ngOnDestroy(): void {
    this.cities$.unsubscribe()
  }

  goToHotelPage(): void {
    if(this.destination==null){
      alert("please select a city")
      return
    }
    if(this.checkInDate == null){
      alert("please input check in date")
      return
    }
    if(this.checkOutDate == null){
      alert("please input checkout date")
      return
    }
    if(this.quantityGuest<= 0){
      alert("please input guest quantity")
      return
    }
    if(this.quantityRoom <= 0){
      alert("please input room quantity")
      return
    }
    if(this.checkInDate >= this.checkOutDate){
      alert("please input valid date")
      return
    }


    let day, month, year, checkInDate, checkOutDate = null

    day = this.checkInDate.getDate()
    // console.log(this.fromDate)
    month = this.checkInDate.getMonth() + 1
    year = this.checkInDate.getFullYear()
    if (day < 10) {
      day = "0" + day
    }
    if (month < 10) {
      month = "0" + month
    }
    console.log(month)
    checkInDate = month + "/" + day + "/" + year

    day = this.checkOutDate.getDate()
    month = this.checkOutDate.getMonth() + 1
    year = this.checkOutDate.getFullYear()
    if (day < 10) {
      day = "0" + day
    }
    if (month < 10) {
      month = "0" + month
    }
    checkOutDate = month + "/" + day + "/" + year

    let json = {
      "cityId": this.destination,
      "checkInDate": checkInDate,
      "checkOutDate": checkOutDate,
      "quantityRoom": this.quantityRoom,
      "quantityGuest": this.quantityGuest,
    }
    
    sessionStorage.setItem("hotelQuery", JSON.stringify(json))
    this.router.navigateByUrl("hotel/search")
    
  }


}
