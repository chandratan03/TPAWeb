import { Component, OnInit } from '@angular/core';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { City } from 'src/app/models/city';
import { Subscription, from } from 'rxjs';
import { JsonPipe, formatDate } from '@angular/common';
import { isNumber } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {
  
  pulang:boolean;


  fromDate:Date;
  backDate:Date;

  selectedFromId: string
  selectedToId:string
  selectedClass:string
  manyPassenger: number

  classes: string[]
  flightToSearch = {}

  constructor(public myService: GraphqpUserService,
    private router: Router
    ) {
    
  }
  cities: City
  cities$: Subscription

  disabled :boolean = true;
  ngOnInit() {
    this.classes = [
      "ekonomi",
      "premium ekonomi",
      "bisnis",
      "first",
      
    ]
    this.getCities()
    sessionStorage.removeItem("flightQuery")
  }
  test():void{
    console.log(this.manyPassenger)
    console.log(this.fromDate)
    console.log(this.backDate)
    console.log(this.selectedFromId)
    console.log(this.selectedToId)
    console.log(this.selectedClass)
    console.log("hehe")
    console.log(this.fromDate.getDate())


  }

  flightSearchPage():void{
    if(this.selectedFromId == null){
      alert("input where to depart")
      return
    }
    if(this.selectedToId == null){
      alert("input where to arrive")
      return
    }

    if(this.selectedToId == this.selectedFromId){
      alert("please don't select same country")
      return
    }

    if(this.fromDate == null){
      alert("Input from date")
      return
    }
    if(this.pulang==true && this.backDate == null){
      alert("Input back date")
      return
    }
    if(this.manyPassenger <=0 || this.manyPassenger > 7){
      alert("please insert quantity")
      return
    }
    if(this.selectedClass == null){
      alert("please select class")
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

    if(this.backDate !=null){
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
    }
    this.flightToSearch = {
      "fromId": this.selectedFromId,
      "toId": this.selectedToId,
      "fromDate": fromDate,
      "backDate": backDate,
      "manyPassenger": this.manyPassenger,
      "class": this.selectedClass
    }
    // this.flightToSearch[]
    sessionStorage.setItem("flightQuery", JSON.stringify(this.flightToSearch))
    this.router.navigateByUrl("/flight/search")
  }

  


  getCities():void{
    this.cities$ = this.myService.getCities().subscribe(query => {
      this.cities = query.data.cities
      // console.log(query.data)
      console.log(this.cities)
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cities$.unsubscribe()
  }
}
