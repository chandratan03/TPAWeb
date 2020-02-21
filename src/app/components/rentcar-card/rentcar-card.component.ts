import { Component, OnInit } from '@angular/core';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { City } from 'src/app/models/city';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rentcar-card',
  templateUrl: './rentcar-card.component.html',
  styleUrls: ['./rentcar-card.component.scss']
})
export class RentcarCardComponent implements OnInit {

  constructor(public myService: GraphqpUserService,
    private router: Router
    ) { }
  cities: City
  cities$: Subscription

  cityId: number
  fromDate: Date
  backDate: Date
  quantity: number
  ngOnInit() {
    this.getCities()
    sessionStorage.removeItem("carQuery")
  }
  getCities():void{
    this.cities$ = this.myService.getCities().subscribe(query => {
      this.cities = query.data.cities
      // console.log(query.data)
    })
    
  }

  searchCar():void{
    if(this.cityId == null){
      alert("input the city for rent")
      return
    }

    if(this.fromDate == null || this.backDate == null){
      alert("Input from and back date")
      return
    }
    if(this.quantity<=0 ){
      alert("input quantity")
      return
    }
   
    console.log(this.fromDate.getDate())
    let day, month, year, fromDate, backDate=null

    day = this.fromDate.getDate()
    // console.log(this.fromDate)
    month = this.fromDate.getMonth()+1
    year = this.fromDate.getFullYear()
    if(day < 10){
      day = "0"+day
    }
    if(month<10){
      month = "0"+month
    }
    console.log(month)
    fromDate = month+"/"+day+"/"+year

    day = this.backDate.getDate()
    month = this.backDate.getMonth()+1
    year = this.backDate.getFullYear()
    if(day < 10){
      day = "0"+day
    }
    if(month<10){
      month = "0"+month
    }
    backDate = month+"/"+day+"/"+year
    let json = {
      "cityId": this.cityId,
      "fromDate": fromDate,
      "backDate": backDate,
      "quantity": this.quantity,
    }
    // this.flightToSearch[]
    sessionStorage.setItem("carQuery", JSON.stringify(json))
    this.router.navigateByUrl("/car/search")
  
  }

}
