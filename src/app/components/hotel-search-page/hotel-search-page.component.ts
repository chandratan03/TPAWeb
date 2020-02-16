import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Subscription } from 'rxjs';
import { Hotel } from 'src/app/models/hotel';
import { Facility } from 'src/app/models/facility';
import { MatSliderChange, MatSlider } from '@angular/material';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { Area } from 'src/app/models/area';

@Component({
  selector: 'app-hotel-search-page',
  templateUrl: './hotel-search-page.component.html',
  styleUrls: ['./hotel-search-page.component.scss']
})
export class HotelSearchPageComponent implements OnInit {


  //
  cities: City
  cities$: Subscription
  destination: number
  checkInDate: Date
  checkOutDate: Date
  quantityRoom: number
  quantityGuest: number
  
  //
  areas: Area[]
  areasCheckbox: boolean[]
  areasCheckbox2: boolean[]
  hotelFacilities$: Subscription
  hotelFacilities: Facility[]

  hotelFacilitiesChecked: boolean[]
  hotelFacilitiesChecked2: boolean[]

  starsBool: boolean[] = new Array(5)// for check
  starsBool2: boolean[] = Array(5) // for model
  constructor(
    private myService: GraphqpUserService,
    private router: Router
  ) {
  }
  hotels$: Subscription
  hotels: Hotel[]
  allHotelsData: Hotel[]

  AscOrDscName: number = 0;


  isSlidedPrice: boolean
  sliderValue: number = 0
  // @ViewChild(MatSlider) slider: MatSlider;
  // sliderValueBefore: number=0
  ngOnInit() {
    let json = JSON.parse(sessionStorage.getItem("hotelQuery"))

    this.destination = json["cityId"]
    this.checkInDate = new Date(json["checkInDate"])
    this.checkOutDate = new Date(json["checkOutDate"])
    this.quantityRoom = json["quantityRoom"]
    this.quantityGuest = json["quantityGuest"]
    this.getCities()
    this.getHotels();
    for (let i = 0; i < 5; i++) {
      this.starsBool[i] = false
    }
    this.isSlidedPrice = false;
    this.getFacilities()

  
    // console.log(json["cityId"]);
    console.log(this.destination);
    console.log(this.checkOutDate.getDate() - this.checkInDate.getDate()  )
    console.log(this.checkOutDate);
    console.log(this.quantityGuest)
    console.log(this.quantityGuest)
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cities$.unsubscribe()
    this.hotelFacilities$.unsubscribe()
  }

  getCities(): void {
    this.cities$ = this.myService.getCities().subscribe(query => {
      this.cities = query.data.cities
    })
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
    window.location.reload()
    
  }


  resetFilter(): void {
    for (let i = 0; i < this.starsBool.length; i++) {
      this.starsBool[i] = false;
      this.starsBool2[i] = false;
    }
    for (let i = 0; i < this.hotelFacilitiesChecked.length; i++) {
      this.hotelFacilitiesChecked[i] = false;
      this.hotelFacilitiesChecked2[i] = false;
    }
    this.sliderValue = 0
    this.isSlidedPrice = false
    this.validateAllFilter()
  }

  getFacilities(): void {
    this.hotelFacilities$ = this.myService.getFacilitiesByForObject("hotel").subscribe(query => {
      this.hotelFacilities = query.data.facilitiesByForObject
      let length = this.hotelFacilities.length
      console.log(this.hotelFacilities)
      this.hotelFacilitiesChecked = Array(length)
      this.hotelFacilitiesChecked2 = Array(length)
      for (let i = 0; i < length; i++) {
        this.hotelFacilitiesChecked[i] = false
        this.hotelFacilitiesChecked2[i] = false
      }
    })
  }

  markFacilities(i: number) {
    this.hotelFacilitiesChecked[i] = !this.hotelFacilitiesChecked[i];
    this.validateAllFilter()
  }

  initSliderDuration(event: MatSliderChange) {
    this.isSlidedPrice = true
    // console.log(this.sliderValue)
    this.sliderValue = event.value
    // this.validateTransits()
    this.validateAllFilter()
  }



  validateAllFilter(): void {
    this.validateAllStars()
    this.validateFacilities()
    this.validateSlide()
    this.validateAreas();
  }
  validateSlide(): void {
    if (this.isSlidedPrice == false) return

    let tempHotels = []
    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].price >= this.sliderValue) {
        tempHotels.push(this.hotels[i])
      }
    }
    this.hotels = tempHotels

  }

  checkHotelsFacilities(facilityIndex: number, hotel: Hotel) {
    for (let i = 0; i < hotel.hotelFacilities.length; i++) {
      if (this.hotelFacilities[facilityIndex].id == hotel.hotelFacilities[i].facility.id) {
        return true
      }
    }
    return false
  }
  validateFacilities(): void {
    let flag = 0;
    for (let i = 0; i < this.hotelFacilitiesChecked.length; i++) {
      if (this.hotelFacilitiesChecked[i] == true) {
        flag = 1
      }
    }
    if (flag == 0) {
      return
    }
    let tempHotels = []
    for (let i = 0; i < this.hotels.length; i++) {
      for (let j = 0; j < this.hotelFacilitiesChecked.length; j++) {
        if (this.hotelFacilitiesChecked[j] == true && this.checkHotelsFacilities(j, this.hotels[i])) {
          tempHotels.push(this.hotels[i])
          break;
        }
      }
    }
    if (tempHotels.length != 0)
      this.hotels = tempHotels

  }

  getAreas():void{
    this.areas=[]
    for(let i=0; i<this.allHotelsData.length; i++){
      let flag=0;
      for(let j=0; j<this.areas.length; j++){
        if(this.areas[j].id == this.allHotelsData[i].area.id){
          flag=1
          break;
        }
      }
      if(flag==0){
        this.areas.push(this.allHotelsData[i].area)
      }
    }
    this.areasCheckbox= Array(this.areas.length)
    this.areasCheckbox2 = Array(this.areas.length)
    for(let i=0; i<this.areas.length; i++){
      this.areasCheckbox[i]=this.areasCheckbox2[i]=false;
    }
  }

  checkArea(i:number):void{
    this.areasCheckbox[i] =!this.areasCheckbox[i]
    this.validateAllFilter()
  }
  validateAreas():void{
    let flag=0;
    for(let i=0; i<this.areasCheckbox.length; i++){
      if(this.areasCheckbox[i] == true){
        flag=1;
        break 
      }
    }
    if(flag==1){
      let temp = []
      for(let i=0; i<this.areas.length; i++){
        if(this.areasCheckbox[i] == false)
          continue
        for(let j=0; j<this.hotels.length; j++){
          if(this.hotels[j].area.id == this.areas[i].id){
            temp.push(this.hotels[j])
          }
        }
      }
      this.hotels = temp;
      

    }
    
  }
  getHotels(): void {
    this.hotels$ = this.myService.getHotels().subscribe(query => {
      this.hotels = query.data.hotels
      
      console.log(this.hotels)
      this.allHotelsData = []
      for(let i=0; i<this.hotels.length; i++){
        // console.log(this.hotels[i].city)
        if(this.hotels[i].city.id == this.destination){
          this.allHotelsData.push(this.hotels[i])
          // console.log(this.hotels[i])
        }
      }
      this.getAreas()
      


      // this.allHotelsData = this.hotels
      this.hotels = Array(0)
      this.validateAllStars()
    }
    )
  }
 

  markHotel(index): void {
    this.starsBool[index] = !this.starsBool[index]
    this.validateAllFilter()
  }
  validateAllStars(): void {
    let flag: number = 0;
    for (let i = 0; i < 5; i++) {
      if (this.starsBool[i] == true) {
        flag = 1
      }
    }
    if (flag == 0) {
      this.hotels = this.allHotelsData
    } else if (flag == 1) {
      this.hotels = Array(0)
      this.oneStarFilter()
      this.twoStarsFilter()
      this.threeStarsFilter()
      this.fourStarsFilter()
      this.fiveStarsFilter()
      if (this.AscOrDscName == 1) {
        this.sortAscName()
      } else if (this.AscOrDscName == 2) {
        this.sortDscName()
      }
    }
  }
  oneStarFilter(): void {
    if (this.starsBool[0] == false) {
      return
    }
    for (let i = 0; i < this.allHotelsData.length; i++) {
      if (this.allHotelsData[i].rate == 1) {
        this.hotels.push(this.allHotelsData[i])
      }
    }

  }

  twoStarsFilter(): void {
    if (this.starsBool[1] == false) {
      return
    }
    for (let i = 0; i < this.allHotelsData.length; i++) {
      if (this.allHotelsData[i].rate == 2) {
        this.hotels.push(this.allHotelsData[i])
      }
    }
  }

  threeStarsFilter(): void {
    if (this.starsBool[2] == false) {
      return
    }
    for (let i = 0; i < this.allHotelsData.length; i++) {
      if (this.allHotelsData[i].rate == 3) {
        this.hotels.push(this.allHotelsData[i])
      }
    }
  }

  fourStarsFilter(): void {
    if (this.starsBool[3] == false) {
      return
    }
    for (let i = 0; i < this.allHotelsData.length; i++) {
      if (this.allHotelsData[i].rate == 4) {
        this.hotels.push(this.allHotelsData[i])
      }
    }
  }

  fiveStarsFilter(): void {
    if (this.starsBool[4] == false) {
      return
    }
    for (let i = 0; i < this.allHotelsData.length; i++) {
      if (this.allHotelsData[i].rate == 5) {
        this.hotels.push(this.allHotelsData[i])
      }
    }
  }

  sortAscName(): void {
    // this.AscOrDscName = 1
    this.hotels.sort((a, b) => {
      if (a.hotelName < b.hotelName) return -1;
      else if (a.hotelName > b.hotelName) return 1;
      else return 0;
    });
  }

  sortDscName(): void {
    // this.AscOrDscName = 2
    this.hotels.sort((a, b) => {
      if (a.hotelName > b.hotelName) return -1;
      else if (a.hotelName < b.hotelName) return 1;
      else return 0;
    });
  }
  sortAscRating(): void {
    // this.AscOrDscName = 1
    this.hotels.sort((a, b) => {
      if (a.rate< b.rate) return -1;
      else if (a.rate > b.rate) return 1;
      else return 0;
    });
  }

  sortDscRating(): void {
    // this.AscOrDscName = 2
    this.hotels.sort((a, b) => {
      if (a.rate > b.rate) return -1;
      else if (a.rate < b.rate) return 1;
      else return 0;
    });
  }

  sortAscPrice(): void {
    // this.AscOrDscName = 1
    this.hotels.sort((a, b) => {
      if (a.price< b.price) return -1;
      else if (a.price > b.price) return 1;
      else return 0;
    });
  }

  sortDscPrice(): void {
    // this.AscOrDscName = 2
    this.hotels.sort((a, b) => {
      if (a.price > b.price) return -1;
      else if (a.price < b.price) return 1;
      else return 0;
    });
  }

  orderNow(i: number): void{
    let id  = this.hotels[i].id
    sessionStorage.setItem("hotelId", id.toString())
    this.router.navigateByUrl("hotel/search/detail") 
  }



}
