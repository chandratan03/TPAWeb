import { Component, OnInit } from '@angular/core';
import { GraphqpUserService } from '../../services/graphqp-user.service';
import { Flight } from '../../models/flight';
import { Subscription } from 'rxjs';
import { MatSliderChange } from '@angular/material';
import { Airline } from 'src/app/models/airline';
import { Facility } from 'src/app/models/facility';
import { City } from 'src/app/models/city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search-page',
  templateUrl: './flight-search-page.component.html',
  styleUrls: ['./flight-search-page.component.scss']
})
export class FlightSearchPageComponent implements OnInit {

  flights$: Subscription

  flights2$: Subscription
  flights: Flight[]
  AllFlights: Flight[]
  tempFlights: Flight[] // DO NOT USE THIS // BECAUSE THIS CONTAINS ALL FLIGHT
  TakedTimeFlights: Flight[]
  transits: boolean[]
  modelTransits: boolean[]


  boolDetailPriceBox: boolean[]


  showDetailFlights: boolean[]
  depaturesTime: boolean[]
  arrivalsTime: boolean[]
  depaturesTime2: boolean[]
  arrivalsTime2: boolean[]

  sliderValue: number;
  isSlideDuration: boolean
  isSlidedOnce = 0

  airlineFacilities: Facility[]
  airlineFacilitiesSubscription$: Subscription
  airlineFacilitiesChecked: boolean[]
  airlineFacilitiesChecked2: boolean[]


  //Airline
  airlines: Airline[]
  airlinesCheckbox: boolean[]
  airlinesCheckbox2: boolean[]



  // card
  pulang:boolean;


  fromDate:Date;
  backDate:Date;

  selectedFromId: string
  selectedToId:string
  selectedClass:string
  manyPassenger: number

  classes: string[]
  classPrice:number;
  flightToSearch = {}
  
  cities: City
  cities$: Subscription



  transitBoolean: Boolean = true
  slideDurationBoolean: Boolean = true
  timeBoolean: Boolean = true
  airlineBoolean:boolean = true
  facilityBoolean: boolean = true
  



  constructor(
    private myService: GraphqpUserService,
    private router: Router
  ) { }

  initSliderDuration(event: MatSliderChange) {
    this.sliderValue = event.value
    // if(this.isSlidedOnce ==0 ){
    //   this.isSlidedOnce++
    //   return
    // }
    this.isSlideDuration = true
    console.log(this.sliderValue)
    this.validateTransits()
    this.getCities()
  }

  resetStatus(): void {
    for (let i = 0; i < this.depaturesTime.length; i++) {
      this.depaturesTime[i] = false
      this.depaturesTime2[i] = false
    }
    for (let i = 0; i < this.arrivalsTime.length; i++) {
      this.arrivalsTime[i] = false
      this.arrivalsTime2[i] = false
    }

    for (let i = 0; i < this.transits.length; i++) {
      this.transits[i] = false;
      this.modelTransits[i] = false
    }

    for (let i = 0; i < this.airlinesCheckbox.length; i++) {
      this.airlinesCheckbox[i] = false;
      this.airlinesCheckbox2[i] = false
    }
    for (let i = 0; i < this.airlineFacilitiesChecked.length; i++) {
      this.airlineFacilitiesChecked[i] = false;
      this.airlineFacilitiesChecked2[i] = false
    }


    this.isSlideDuration = false
    this.validateTransits();
  }

  ngOnInit() {
    console.log(sessionStorage.getItem("checkoutFlight"))
    this.classes = [
      "ekonomi",
      "premium ekonomi",
      "bisnis",
      "first",
      
    ]
    this.airlines = Array()

    this.sliderValue = 0
    this.isSlideDuration = false
    this.transits = Array(3)
    this.modelTransits = Array(3)
    this.depaturesTime = Array(4)
    this.arrivalsTime = Array(4)

    this.depaturesTime2 = Array(4)
    this.arrivalsTime2 = Array(4)


    for (let i = 0; i < this.depaturesTime.length; i++) {
      this.depaturesTime[i] = false
      this.depaturesTime2[i] = false
    }
    for (let i = 0; i < this.arrivalsTime.length; i++) {
      this.arrivalsTime[i] = false
      this.arrivalsTime2[i] = false
    }

    for (let i = 0; i < this.transits.length; i++) {
      this.transits[i] = false;
      this.modelTransits[i] = false
    }
    this.getFlights()
    // console.log(this.tempFlights)
    this.getFacilities()
    console.log(this.airlines)

    this.flights = Array(0)
    document.onscroll = function () {
      if (window.scrollY + window.innerHeight + window.innerHeight * 20 / 100 >= document.body.scrollHeight) {

        this.setData()
      }
    }.bind(this)
    this.getCities();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.flights$.unsubscribe()
    // this.flights2$.unsubscribe()
    this.airlineFacilitiesSubscription$.unsubscribe()
    this.cities$.unsubscribe()
  }

  //card
  checkOut(i:number):void{
    // this.selectedFromId = json["fromId"]
    // this.selectedToId = json["toId"]
    // this.fromDate = new Date(json["fromDate"])
    // this.backDate = new Date(json["backDate"])
    // this.manyPassenger = json["manyPassenger"]
    // this.selectedClass  = json["class"]
    // this.selectedClass = this.selectedClass.toLowerCase()
    sessionStorage.removeItem("flightQuery")
    
    let quantity = this.manyPassenger
    let flight = this.flights[i]
    let selectClass= this.selectedClass

    let json = {
      "flight": flight,
      "quantity": quantity,
      "selectClass": selectClass
    }
    let stringiJson = JSON.stringify(json)
    sessionStorage.setItem("checkoutFlight", stringiJson)
    this.router.navigateByUrl("cart/checkout")
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
    window.location.reload()
    // this.router.navigateByUrl("/flight/search")
  }

  


  getCities():void{
    this.cities$ = this.myService.getCities().subscribe(query => {
      this.cities = query.data.cities
      // console.log(query.data)
      console.log(this.cities)
      
      let json = JSON.parse(sessionStorage.getItem("flightQuery"))
      this.selectedFromId = json["fromId"]
      this.selectedToId = json["toId"]
      this.fromDate = new Date(json["fromDate"])
      this.backDate = new Date(json["backDate"])
      this.manyPassenger = json["manyPassenger"]
      this.selectedClass  = json["class"]
      this.selectedClass = this.selectedClass.toLowerCase()
      // "ekonomi",
      // "premium ekonomi",
      // "bisnis",
      // "first",
      
      
      if(this.backDate !=null){
        this.pulang=true
      }
      console.log(this.selectedFromId)
      console.log(this.selectedToId)
      console.log(this.fromDate)
      console.log(this.backDate)
      console.log(this.manyPassenger)
      console.log(this.selectedClass)
    })

  }

//////////////////////
  getBySlideDuration(): void {
    let tempFlights = []
    for (let i = 0; i < this.AllFlights.length; i++) {
      if (this.AllFlights[i].duration / 60 <= this.sliderValue) {
        tempFlights.push(this.AllFlights[i])
      }
    }
    this.AllFlights = tempFlights;

  }

  validateTransits(): void {
    let flag = 0;

    for (let i = 0; i < this.transits.length; i++) {
      if (this.transits[i] == true) {
        flag = 1;
        break;
      }
    }
    this.AllFlights = []
    if (flag == 0) {

      this.from = 0
      this.flights = Array(0)
      this.AllFlights = this.tempFlights
    } else {

      this.from = 0
      this.flights = Array(0)
      this.transitsLangsung();
      this.transits1();
      this.transits2();
    }
    if (this.isSlideDuration) {
      this.getBySlideDuration()
    }
    this.TakedTimeFlights = []
    if (this.checkDepaturesAndArrivalsTime()) {
      this.getDepAndArrIsChecked()
      // console.log("hello")
      this.AllFlights = this.TakedTimeFlights
    }

    if (this.checkAirlinesIsChecked()) {
      console.log("yeay")
      let temp = []
      for (let i = 0; i < this.AllFlights.length; i++) {
        for (let j = 0; j < this.airlines.length; j++) {
          if (this.airlinesCheckbox2[j] == false) {
            continue
          }
          else if (this.airlines[j].id == this.AllFlights[i].airline.id) {
            temp.push(this.AllFlights[i])

            j = this.airlines.length
          }
        }
      }

      this.AllFlights = temp
    }
    if (this.checkAirlineFacilityIsChecked()) {
      let temp = []
      for (let i = 0; i < this.AllFlights.length; i++) {
        for (let j = 0; j < this.airlineFacilities.length; j++) {
          let tag = 0;
          if (this.airlineFacilitiesChecked[j] == false) {
            continue
          } else {
            let airlineFacilities = this.AllFlights[i].airline.airlineFacilities
            for (let k = 0; k < airlineFacilities.length; k++) {
              if (airlineFacilities[k].facility.id == this.airlineFacilities[j].id) {
                temp.push(this.AllFlights[i])
                tag = 1;
                break;
              }
            }
          }
          if (tag == 1) {
            break;
          }
        }
      }

      this.AllFlights = temp
    }



    this.setData()
  }

  checkAirlineFacilityIsChecked(): boolean {
    for (let i = 0; i < this.airlineFacilitiesChecked.length; i++) {
      if (this.airlineFacilitiesChecked[i] == true) {
        return true
      }
    }
    return false
  }

  markTransit(index: number) {
    this.transits[index] = !this.transits[index]
    this.validateTransits()
  }

  checkDepaturesAndArrivalsTime(): boolean {
    for (let i = 0; i < this.depaturesTime.length; i++) {
      if (this.depaturesTime[i] == true) {
        return true
      }
    }
    for (let i = 0; i < this.arrivalsTime.length; i++) {
      if (this.arrivalsTime[i] == true) {
        return true
      }
    }
    return false
  }

  checkDeparture(i: number): void {
    this.depaturesTime[i] = !this.depaturesTime[i]
    // console.log(this.depaturesTime[i])
    this.validateTransits()
  }
  checkArrival(i: number): void {
    this.arrivalsTime[i] = !this.arrivalsTime[i]

    this.validateTransits()

  }



  checkDepIs0to6(hours: number): boolean {
    if (this.depaturesTime[0] == false)
      return false
    return hours >= 0 && hours <= 6
  }

  checkDepIs6to12(hours: number): boolean {
    if (this.depaturesTime[1] == false)
      return false
    return hours >= 6 && hours <= 12
  }

  checkDepIs12to18(hours: number): boolean {

    if (this.depaturesTime[2] == false)
      return false
    return hours >= 12 && hours <= 18
  }

  checkDepIs18to24(hours: number): boolean {
    if (this.depaturesTime[3] == false)
      return false
    return hours >= 18 && hours <= 24
  }


  checkArrIs0to6(hours: number): boolean {
    if (this.arrivalsTime[0] == false)
      return false
    return hours >= 0 && hours <= 6
  }

  checkArrIs6to12(hours: number): boolean {
    if (this.arrivalsTime[1] == false)
      return false
    return hours >= 6 && hours <= 12
  }

  checkArrIs12to18(hours: number): boolean {

    if (this.arrivalsTime[2] == false)
      return false
    return hours >= 12 && hours <= 18
  }

  checkArrIs18to24(hours: number): boolean {
    if (this.arrivalsTime[3] == false)
      return false
    return hours >= 18 && hours <= 24
  }
  getDepAndArrIsChecked(): void {
    for (let i = 0; i < this.AllFlights.length; i++) {
      if (this.checkDepIs0to6(this.AllFlights[i].timeDepature.hours) ||
        this.checkDepIs6to12(this.AllFlights[i].timeDepature.hours) ||
        this.checkDepIs12to18(this.AllFlights[i].timeDepature.hours) ||
        this.checkDepIs18to24(this.AllFlights[i].timeDepature.hours) ||
        this.checkArrIs0to6(this.AllFlights[i].timeArrival.hours) ||
        this.checkArrIs6to12(this.AllFlights[i].timeArrival.hours) ||
        this.checkArrIs12to18(this.AllFlights[i].timeArrival.hours) ||
        this.checkArrIs18to24(this.AllFlights[i].timeArrival.hours)
      ) {
        this.TakedTimeFlights.push(this.AllFlights[i])
      }
    }
  }


  checkDetailPriceBox(i:number):void{
    this.boolDetailPriceBox[i] = !this.boolDetailPriceBox[i]
  }


  transitsLangsung(): void {
    if (this.transits[0] == false) return
    for (let i = 0; i < this.tempFlights.length; i++) {
      if (this.tempFlights[i].transit == 0) {
        this.AllFlights.push(this.tempFlights[i])
      }
    }
  }
  transits1(): void {
    if (this.transits[1] == false) return
    for (let i = 0; i < this.tempFlights.length; i++) {
      if (this.tempFlights[i].transit == 1) {
        this.AllFlights.push(this.tempFlights[i])
      }
    }
  }

  transits2(): void {
    if (this.transits[2] == false) return
    for (let i = 0; i < this.tempFlights.length; i++) {
      if (this.tempFlights[i].transit >= 2) {
        this.AllFlights.push(this.tempFlights[i])
      }
    }
  }

  from: number = 0;

  setData(): void {
    if (this.from >= this.AllFlights.length) {
      return
    }
    let temp = this.AllFlights.slice(this.from, this.from + 5)
    console.log(temp)
    this.flights.push(...temp)
    this.from += 5
  }

  showDetailFlightClick(i: number): void {
    this.showDetailFlights[i] = !this.showDetailFlights[i]
  }




  changeTimeFormat(word: number): string {
    if (word <= 10) {
      var temp = "0" + word
    } else {
      var temp = word.toString()
    }
    return temp
  }


  

  getFlights(): void {
    let flightQuery = sessionStorage.getItem("flightQuery")
    flightQuery = JSON.parse(flightQuery)
    let fromId, toId, fromDate, backDate
    fromId = flightQuery["fromId"]
    toId = flightQuery["toId"]
    fromDate = flightQuery["fromDate"]
    backDate = flightQuery["backDate"]
    
    this.selectedClass  = flightQuery["class"]
    this.selectedClass = this.selectedClass.toLowerCase()
    // "ekonomi",
    //   "premium ekonomi",
    //   "bisnis",
    //   "first",
    switch(this.selectedClass){
      case "ekonomi":
        this.classPrice = 0 // 0%
        break;
      case "premium ekonomi":
        this.classPrice = (10/100) // 10%
        break;
      case "bisnis":
        this.classPrice = 20/100 // 20%
        break;
      case "first":
        this.classPrice = 30/100 // 30%
        break

    }
    console.log(fromId)
    console.log(toId)
    console.log(fromDate)


    this.flights$ = this.myService.getFlightsByFromToDate(fromId, toId, fromDate).subscribe(async query => {
      this.AllFlights = query.data.flightsByFromToDate as Flight[]
      console.log(query.data)
      if(backDate != null){
        this.boolDetailPriceBox = []
        this.flights2$ = this.myService.getFlightsByFromToDate(toId, fromId, backDate).subscribe(query => {
          this.AllFlights.push(... query.data.flightsByFromToDate as Flight[])
          this.showDetailFlights = Array(this.AllFlights.length)
          console.log(this.AllFlights.length)
          this.boolDetailPriceBox = Array(this.AllFlights.length)
          for (let i = 0; i < this.AllFlights.length; i++) {
            this.showDetailFlights[i] = false
            this.boolDetailPriceBox[i] = false
            
            let depMinTemp = new Date(this.AllFlights[i].departure).getUTCHours()
            let depMin = this.changeTimeFormat(depMinTemp)
            let depSecTemp = new Date(this.AllFlights[i].departure).getUTCMinutes()
            let depSec = this.changeTimeFormat(depSecTemp)
            let arrMinTemp = new Date(this.AllFlights[i].arrival).getUTCHours()
            let arrMin = this.changeTimeFormat(arrMinTemp)
            let arrSecTemp = new Date(this.AllFlights[i].arrival).getUTCMinutes()
            let arrSec = this.changeTimeFormat(arrSecTemp)
  
            let dep = depMin + ":" + depSec
            let arr = arrMin + ":" + arrSec
  
            this.AllFlights[i].timeDepature = {
              hours: depMinTemp,
              minutes: depSecTemp
            }
            // this.AllFlights[i].timeDepature.minutes = depSecTemp
  
            // this.AllFlights[i].timeArrival.hours = arrMinTemp
            // this.AllFlights[i].timeArrival.minutes = arrSecTemp
            this.AllFlights[i].timeArrival = {
              hours: arrMinTemp,
              minutes: arrSecTemp
            }
            // dep = Min
            this.AllFlights[i].departure = dep
            this.AllFlights[i].arrival = arr
            let countRoute = this.AllFlights[i].routes.length
            this.AllFlights[i].transit = countRoute
            if (countRoute == 0) {
              this.AllFlights[i].sTransit = "langsung"
            } else {
              this.AllFlights[i].sTransit = countRoute + " transits"
            }
          }
  
  
          this.tempFlights = this.AllFlights
          console.log(this.tempFlights)
  
  
          // set airlines
          for (let i = 0; i < this.tempFlights.length; i++) {
            if (i == 0) {
              this.airlines.push(this.tempFlights[i].airline)
            } else {
              let tag = 0;
              for (let j = 0; j < this.airlines.length; j++) {
                if (this.airlines[j].id == this.tempFlights[i].airline.id) {
                  tag = 1
                  break;
                }
              }
              if (tag == 0) {
                this.airlines.push(this.tempFlights[i].airline)
              }
            }
          }
          this.airlinesCheckbox2 = Array(this.airlines.length)
          this.airlinesCheckbox = Array(this.airlines.length)
          for (let i = 0; i < this.airlinesCheckbox.length; i++) {
            this.airlinesCheckbox[i] = false
            this.airlinesCheckbox2[i] = false
          }
          this.setData()
        })
      }else{// copy paste dari atas
        this.showDetailFlights = Array(this.AllFlights.length)
        this.boolDetailPriceBox = Array(this.AllFlights.length)
          for (let i = 0; i < this.AllFlights.length; i++) {
            this.showDetailFlights[i] = false
            this.boolDetailPriceBox[i] = false
            let depMinTemp = new Date(this.AllFlights[i].departure).getUTCHours()
            let depMin = this.changeTimeFormat(depMinTemp)
            let depSecTemp = new Date(this.AllFlights[i].departure).getUTCMinutes()
            let depSec = this.changeTimeFormat(depSecTemp)
            let arrMinTemp = new Date(this.AllFlights[i].arrival).getUTCHours()
            let arrMin = this.changeTimeFormat(arrMinTemp)
            let arrSecTemp = new Date(this.AllFlights[i].arrival).getUTCMinutes()
            let arrSec = this.changeTimeFormat(arrSecTemp)
  
            let dep = depMin + ":" + depSec
            let arr = arrMin + ":" + arrSec
  
            this.AllFlights[i].timeDepature = {
              hours: depMinTemp,
              minutes: depSecTemp
            }
            // this.AllFlights[i].timeDepature.minutes = depSecTemp
  
            // this.AllFlights[i].timeArrival.hours = arrMinTemp
            // this.AllFlights[i].timeArrival.minutes = arrSecTemp
            this.AllFlights[i].timeArrival = {
              hours: arrMinTemp,
              minutes: arrSecTemp
            }
            // dep = Min
            this.AllFlights[i].departure = dep
            this.AllFlights[i].arrival = arr
            let countRoute = this.AllFlights[i].routes.length
            this.AllFlights[i].transit = countRoute
            if (countRoute == 0) {
              this.AllFlights[i].sTransit = "langsung"
            } else {
              this.AllFlights[i].sTransit = countRoute + " transits"
            }
          }
  
  
          this.tempFlights = this.AllFlights
          console.log(this.tempFlights)
  
  
          // set airlines
          for (let i = 0; i < this.tempFlights.length; i++) {
            if (i == 0) {
              this.airlines.push(this.tempFlights[i].airline)
            } else {
              let tag = 0;
              for (let j = 0; j < this.airlines.length; j++) {
                if (this.airlines[j].id == this.tempFlights[i].airline.id) {
                  tag = 1
                  break;
                }
              }
              if (tag == 0) {
                this.airlines.push(this.tempFlights[i].airline)
              }
            }
          }
          this.airlinesCheckbox2 = Array(this.airlines.length)
          this.airlinesCheckbox = Array(this.airlines.length)
          for (let i = 0; i < this.airlinesCheckbox.length; i++) {
            this.airlinesCheckbox[i] = false
            this.airlinesCheckbox2[i] = false
          }
          this.setData()
      }



    }
    )
  }

  markAirlineFacilities(i: number) {
    this.airlineFacilitiesChecked[i] = !this.airlineFacilitiesChecked[i]
    this.validateTransits()
  }
  getFacilities() {
    this.airlineFacilitiesSubscription$ = this.myService.getFacilitiesByForObject("flight").subscribe(query => {
      this.airlineFacilities = query.data.facilitiesByForObject
      let length = this.airlineFacilities.length
      this.airlineFacilitiesChecked = Array(length)
      this.airlineFacilitiesChecked2 = Array(length)
      for (let i = 0; i < length; i++) {
        this.airlineFacilitiesChecked[i] = false
        this.airlineFacilitiesChecked2[i] = false
      }
    })
  }

  checkAirlinesIsChecked(): boolean {
    for (let i = 0; i < this.airlinesCheckbox.length; i++) {
      if (this.airlinesCheckbox2[i] == true) {
        return true
      }
    }
    return false;
  }

  checkboxAirlines(i: number) {
    this.airlinesCheckbox2[i] = !this.airlinesCheckbox2[i]
    this.validateTransits();
  }


  sortByFilterAsc(): void {
    console.log("test")
    this.AllFlights = this.AllFlights.sort((a, b) => a.transit - b.transit)
    // console.log(this.AllFlights.length)
    // for(let i=0; i<this.AllFlights.length; i++){
    //   console.log(this.AllFlights[i].transit)
    // }  
    // this.from = 0
    this.flights = []
    this.from = 0
    this.setData()
    // this.AllFlights = this.tempFlights
  }
  sortByFilterDsc(): void {
    console.log("test")
    this.AllFlights = this.AllFlights.sort((a, b) => b.transit - a.transit)
    // console.log(this.AllFlights.length)
    // for(let i=0; i<this.AllFlights.length; i++){
    //   console.log(this.AllFlights[i].transit)
    // }  
    // this.from = 0
    this.flights = []
    this.from = 0
    this.setData()
    // this.AllFlights = this.tempFlights
  }

  sortByDurationAsc(): void {
    this.AllFlights = this.AllFlights.sort((a, b) => a.duration - b.duration)
    // console.log(this.AllFlights.length)
    // for(let i=0; i<this.AllFlights.length; i++){
    //   console.log(this.AllFlights[i].transit)
    // }  
    // this.from = 0
    this.flights = []
    this.from = 0
    this.setData()

  }
  sortByDurationDsc(): void {
    this.AllFlights = this.AllFlights.sort((a, b) => b.duration - a.duration)
    // console.log(this.AllFlights.length)
    // for(let i=0; i<this.AllFlights.length; i++){
    //   console.log(this.AllFlights[i].transit)
    // }  
    // this.from = 0
    this.flights = []
    this.from = 0
    this.setData()

  }
  sortByTimeAsc(): void {
    this.AllFlights = this.AllFlights.sort((a, b) =>
      (a.timeDepature.hours * 60 + a.timeDepature.minutes) -
      (b.timeDepature.hours * 60 + b.timeDepature.minutes)

    )
    // console.log(this.AllFlights.length)
    // for(let i=0; i<this.AllFlights.length; i++){
    //   console.log(this.AllFlights[i].transit)
    // }  
    // this.from = 0
    this.flights = []
    this.from = 0
    this.setData()
  }
  sortByTimeDsc(): void {
    this.AllFlights = this.AllFlights.sort((a, b) => (b.timeDepature.hours * 60 + b.timeDepature.minutes) -
      (a.timeDepature.hours * 60 + a.timeDepature.minutes)
    )
    // console.log(this.AllFlights.length)
    // for(let i=0; i<this.AllFlights.length; i++){
    //   console.log(this.AllFlights[i].transit)
    // }  
    // this.from = 0
    this.flights = []
    this.from = 0
    this.setData()
  }


}
