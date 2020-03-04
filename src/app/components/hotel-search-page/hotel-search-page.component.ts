import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Subscription, from, Subject } from 'rxjs';
import { Hotel } from 'src/app/models/hotel';
import { Facility } from 'src/app/models/facility';
import { MatSliderChange, MatSlider } from '@angular/material';
import { Router, RouteConfigLoadStart } from '@angular/router';
import { City } from 'src/app/models/city';
import { Area } from 'src/app/models/area';
import * as L from 'leaflet';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';

@Component({
  selector: 'app-hotel-search-page',
  templateUrl: './hotel-search-page.component.html',
  styleUrls: ['./hotel-search-page.component.scss']
})

export class HotelSearchPageComponent implements OnInit {
  map:L.Map=null

  //
  markers =  []
  cities: City
  cities$: Subscription
  destination: number
  checkInDate: Date
  checkOutDate: Date
  quantityRoom: number
  quantityGuest: number
  categories: string[]
  allCategoriesForFilter: string[]
  //
  areas: Area[]
  allAreasForFilter: Area[]//####################
  areasCheckbox: boolean[]
  areasCheckbox2: boolean[]
  hotelFacilities$: Subscription
  hotelFacilities: Facility[]
  allHotelFacilitiesForFilter: Facility[] //###########

  hotelFacilitiesChecked: boolean[]
  hotelFacilitiesChecked2: boolean[] 

  starsBool: boolean[] = new Array(5)// for check
  starsBool2: boolean[] = Array(5) // for model

  hotelBool: boolean[]
  hotelBool2: boolean[]


  categoryBool: boolean[]
  categoryBool2: boolean[]
  



  ///FILTER SPECIFICATION
  starsFilterCount:number[] = Array(5)
  facilitiesFilterCount: number[]
  areasFilterCount: number[];
  categoryFilterCount: number[];
  hotelFilterCount:number[]


  constructor(
    private myService: GraphqpUserService,
    private router: Router,
    private hotelService: GraphqHotelService
  ) {
  }
  hotels$: Subscription
  hotels: Hotel[]
  allHotelsData: Hotel[]
  allHotelsDataForFilter: Hotel[]

  AscOrDscName: number = 0;
  iconMarker = L.divIcon({
    class:"marker",
    html: "<img src='../../../assets/map/marker-icon.png' alt=''>" ,
    iconSize: [20, 20],
    iconAnchor: [20,20],
  })

  isSlidedPrice: boolean
  sliderValue: number = 0

  ngOnInit() {
    //
    this.categories = [
      "hotel",
      "villa"
    ]
    this.allCategoriesForFilter = this.categories
    this.categories = this.allCategoriesForFilter.slice(0,2)
    this.categoryBool = []
    this.categoryBool2 = []
    this.categoryFilterCount = []
    for(let i=0; i<this.categories.length; i++){
      this.categoryBool.push(false);
      this.categoryBool2.push(false);
      this.categoryFilterCount.push(0)
    }

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
    
    this.setModal()
    // this.initAllHotelTickets()
    // console.log(json["cityId"]);
    console.log(this.destination);
    console.log(this.checkOutDate.getDate() - this.checkInDate.getDate())
    console.log(this.checkOutDate);
    console.log(this.quantityGuest)
    console.log(this.quantityGuest)
  }
  
  setFacilitiesFilter(){
    this.hotelFacilities = this.allHotelFacilitiesForFilter
  }
  setAreasFilter(){
    this.areas = this.allAreasForFilter
  }
  setCategoriesFilter(){
    this.categories = this.allCategoriesForFilter
  }
  setHotelNameFilter(){
    this.allHotelsDataForFilter = this.allHotelsData
  }

  markCategory(i:number):void{
    this.categoryBool[i] = !this.categoryBool[i]
    this.validateAllFilter()
  }

  countCategoryFilterCount():void{
    for(let i=0; i<this.categories.length; i++){
      for(let j=0; j<this.allHotelsData.length; j++){
        if(this.allHotelsData[j].category == this.categories[i]){
          this.categoryFilterCount[i]++;
        }
      } 
    }
  }
  setMarkerHotel():void{
    
    if(this.map!=null){
      this.map.off()
      this.map.remove()
    }
    this.map = L.map('map').setView([this.hotels[0].latitude, this.hotels[0].longitude], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }, {icon: this.iconMarker}).addTo(this.map);
    var marker;
    for(let i=0; i<this.hotels.length;i++){
      console.log(this.hotels[i].longitude, this.hotels[i].latitude)
      
      marker = L.marker([this.hotels[i].latitude, this.hotels[i].longitude]).addTo(this.map).
      bindPopup("<p>"+this.hotels[i].hotelName+" </p> <p>"+
       this.hotels[i].ratingNumber+"</p> <p>"+
       this.hotels[i].price+
       "</p> <div> <button mat-button id='orderNowBtn' onclick=\"orderNow("+i+")\">Order now</button></div>").on("click",function(e){
          let btn= document.getElementById('orderNowBtn');
          btn.onclick= ()=>{
            let id = this.hotels[i].id
            sessionStorage.setItem("hotelId", id.toString())
            this.router.navigateByUrl("hotel/search/detail")
          }
          
      }.bind(this))
      this.markers.push(marker)
    }
    
    
    // this.map.on('moveend', function(){

    //   let latitude = parseFloat(this.map.getCenter().lat)
    //   let longitude = parseFloat( this.map.getCenter().lng)

    //   this.hotelService.getHotelsNearby(latitude,
    //     longitude).subscribe( async (result) => {
    //       this.getNewData(result);

    //   })
    // }.bind(this))
    this.map.on("moveend", ()=>{
      let latitude = parseFloat(this.map.getCenter().lat)
      let longitude = parseFloat( this.map.getCenter().lng)
      this.hotelService.getNearestHotel(longitude, latitude).subscribe( q =>{
        this.hotels = q.data.nearestHotels
        console.log(q.data)
        console.log(this.hotels)
      })

    })
  }


  setModal(){
    let mapContainer = document.getElementById("map-container")
    let btn = document.getElementById("showMapButton")
    btn.onclick =()=>{
      this.setMarkerHotel() 
      mapContainer.style.display=  "flex"
      ////////INI MENGATUR KLO DI MODAL SIZENYA RUSAK (MAPNYA YANG RUSAK)
      this.map.invalidateSize();
    }
    window.onclick = (event)=>{
      if(event.target == mapContainer){
        mapContainer.style.display=  "none"
      }
    }
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
    if (this.destination == null) {
      alert("please select a city")
      return
    }
    if (this.checkInDate == null) {
      alert("please input check in date")
      return
    }
    if (this.checkOutDate == null) {
      alert("please input checkout date")
      return
    }
    if (this.quantityGuest <= 0) {
      alert("please input guest quantity")
      return
    }
    if (this.quantityRoom <= 0) {
      alert("please input room quantity")
      return
    }
    if (this.checkInDate >= this.checkOutDate) {
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
    for(let i=0; i<this.categoryBool.length; i++){
      this.categoryBool[i] =false;
      this.categoryBool2[i] =false;
    }
    for(let i=0; i<this.hotelBool.length; i++){
      this.hotelBool[i] = false;
      this.hotelBool2[i] = false;
    }
    for(let i=0; i<this.areasCheckbox.length; i++){
      this.areasCheckbox[i] = false
      this.areasCheckbox2[i] =false
    }

    this.sliderValue = 0
    this.isSlidedPrice = false
    this.validateAllFilter()
  }

  getFacilities(): void {
    this.hotelFacilities$ = this.myService.getFacilitiesByForObject("hotel").subscribe(query => {
      this.hotelFacilities = query.data.facilitiesByForObject
      this.allHotelFacilitiesForFilter = this.hotelFacilities
      let length = this.hotelFacilities.length
      console.log(this.hotelFacilities)
      this.hotelFacilitiesChecked = Array(length)
      this.hotelFacilitiesChecked2 = Array(length)
      this.facilitiesFilterCount = Array(length);
      for (let i = 0; i < length; i++) {
        this.hotelFacilitiesChecked[i] = false
        this.hotelFacilitiesChecked2[i] = false
        this.facilitiesFilterCount[i] = 0;
        for(let j=0; j<this.allHotelsData.length; j++){
          for(let k=0; k<this.allHotelsData[j].hotelFacilities.length; k++){
            if(this.allHotelsData[j].hotelFacilities[k].facility.id == this.hotelFacilities[i].id){
              this.facilitiesFilterCount[i]++;
              break
            }
          }
        }
      }
      this.hotelFacilities = this.allHotelFacilitiesForFilter.slice(0,2);
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
    this.validateHotelNames()
    this.validateAllStars()
    this.validateFacilities()
    this.validateSlide()
    this.validateAreas();
    this.validateCategory()
  } 
  validateHotelNames():void{
    this.hotels = []
    let flag=0;
    for(let i=0; i<this.allHotelsData.length; i++){
      if(this.hotelBool[i] == true){
        flag=1;
        break;
      }
    }
    if(flag==0){
      this.hotels = this.allHotelsData
    }else{
      for(let i=0; i<this.allHotelsData.length; i++){
        if(this.hotelBool[i] == true){
          this.hotels.push(this.allHotelsData[i]);
        }
      }
    }
    console.log(this.hotels)
  }


  validateCategory():void{
    let flag=0
    for(let i=0; i<this.categories.length; i++){
      if(this.categoryBool[i] == true){
        flag=1
      }
    }
    if(flag==1){
      let tempHotels =[]
      for(let i=0; i<this.categories.length; i++){
        if(this.categoryBool[i] == true){
          for(let j=0; j<this.hotels.length; j++){
            if(this.hotels[j].category == this.categories[i]){
              tempHotels.push(this.hotels[j])
            }
          }
        }
      }
      this.hotels = tempHotels 
    }
  
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

  getAreas(): void {
    this.areas = []
    for (let i = 0; i < this.allHotelsData.length; i++) {
      let flag = 0;
      for (let j = 0; j < this.areas.length; j++) {
        if (this.areas[j].id == this.allHotelsData[i].area.id) {
          flag = 1
          break;
        }
      }
      if (flag == 0) {
        this.areas.push(this.allHotelsData[i].area)
      }
    }
    this.areasCheckbox = Array(this.areas.length)
    this.areasCheckbox2 = Array(this.areas.length)
    this.areasFilterCount = Array(this.areas.length) 
    for (let i = 0; i < this.areas.length; i++) {
      this.areasCheckbox[i] = this.areasCheckbox2[i] = false;
      this.areasFilterCount[i] = 0;
      for(let j=0; j<this.allHotelsData.length; j++){
        if(this.allHotelsData[j].area.id == this.areas[i].id){
          this.areasFilterCount[i]++;
        }
      }
    }

    this.allAreasForFilter = this.areas
    this.areas = this.allAreasForFilter.slice(0,2)
  }

  checkArea(i: number): void {
    this.areasCheckbox[i] = !this.areasCheckbox[i]
    this.validateAllFilter()
  }
  validateAreas(): void {
    let flag = 0;
    for (let i = 0; i < this.areasCheckbox.length; i++) {
      if (this.areasCheckbox[i] == true) {
        flag = 1;
        break
      }
    }
    if (flag == 1) {
      let temp = []
      for (let i = 0; i < this.areas.length; i++) {
        if (this.areasCheckbox[i] == false)
          continue
        for (let j = 0; j < this.hotels.length; j++) {
          if (this.hotels[j].area.id == this.areas[i].id) {
            temp.push(this.hotels[j])
          }
        }
      }
      this.hotels = temp;


    }

  }

  markHotelName(i:number):void{
    this.hotelBool[i] = !this.hotelBool[i]
    this.validateAllFilter()
  }
  
  getHotels(): void {
    this.hotels$ = this.myService.getHotels().subscribe(query => {
      this.hotels = query.data.hotels
      this.hotelBool = []
      this.hotelBool2=[]
      this.hotelFilterCount  =[]
      for(let i=0; i<this.hotels.length; i++){
        let length = this.hotels[i].ratings.length;
        let sum=0;
        let hotel = this.hotels[i]
        for(let j=0; j<hotel.ratings.length; j++){
          sum+=hotel.ratings[j].rateScore
        }
        this.hotels[i].ratingNumber = sum/length
        this.hotelBool.push(false)
        this.hotelBool.push(false);
        this.hotelFilterCount.push(0)
      }




      console.log(this.hotels)
      this.allHotelsData = []
      for (let i = 0; i < this.hotels.length; i++) {
        // console.log(this.hotels[i].city)
        if (this.hotels[i].city.id == this.destination) {
          this.allHotelsData.push(this.hotels[i])
          // console.log(this.hotels[i])
        }
      }
      this.allHotelsDataForFilter =this.allHotelsData.slice(0,2);
      this.getAreas()
      this.getFacilities()
      this.countStars()
      this.countCategoryFilterCount()
      // this.allHotelsData = this.hotels
      this.hotels = Array(0)
      this.validateHotelNames()
      this.setMarkerHotel();
    }
    ,null
    ,()=>{
      document.getElementById("loading-page").style.display="none"
    
    }
    )
  }

  countStars():void{
    this.starsFilterCount = Array(5)
    for(let i=0; i<5; i++){
      this.starsFilterCount[i] = 0
    }
    for(let j=0; j<this.allHotelsData.length; j++){
      console.log("test")
      this.starsFilterCount[this.allHotelsData[j].rate-1]++
    }
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
    }if (flag == 1) {
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
    let tempHotel = []
    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].rate == 1) {
        tempHotel.push(this.allHotelsData[i])
      }
      
    }
    this.hotels = tempHotel

  }

  twoStarsFilter(): void {
    if (this.starsBool[1] == false) {
      return
    }
    let tempHotel = []

    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].rate == 2) {
        tempHotel.push(this.allHotelsData[i])
      }
      
    }
    this.hotels = tempHotel

  }

  threeStarsFilter(): void {
    if (this.starsBool[2] == false) {
      return
    }
    let tempHotel = []

    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].rate == 3) {
        tempHotel.push(this.allHotelsData[i])
      }
      
    }
    this.hotels = tempHotel
  }

  fourStarsFilter(): void {
    let tempHotel = []

    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].rate == 4) {
        tempHotel.push(this.allHotelsData[i])
      }
      
    }
    this.hotels = tempHotel
  }

  fiveStarsFilter(): void {
    if (this.starsBool[4] == false) {
      return
    }
    let tempHotel = []

    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].rate == 5) {
        tempHotel.push(this.allHotelsData[i])
      }
      
    }
    this.hotels = tempHotel
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
      if (a.rate < b.rate) return -1;
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
      if (a.price < b.price) return -1;
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

  orderNow(i: number): void {
    let id = this.hotels[i].id
    // sessionStorage.setItem("hotelId", id.toString())
    this.router.navigate(["hotel/search/detail", id])
  }



 
  


}
