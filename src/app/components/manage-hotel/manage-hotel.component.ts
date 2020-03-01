import { Component, OnInit } from '@angular/core';
import { HotelTicket } from 'src/app/models/hotel-ticket';
import { Subscription } from 'rxjs';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { City } from 'src/app/models/city';
import { Hotel } from 'src/app/models/hotel';
import { query } from '@angular/animations';
import { HotelFilterComponent } from '../hotel-filter/hotel-filter.component';
import { Facility } from 'src/app/models/facility';
import { MatSliderChange } from '@angular/material';
import { validate } from 'graphql';
import { User } from 'src/app/models/user';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Route } from 'src/app/models/route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.scss']
})
export class ManageHotelComponent implements OnInit {


  allHotelTickets: HotelTicket[]
  savedHotelTickets: HotelTicket[]
  hotelTickets: HotelTicket[]
  hotelTickets$: Subscription

  cities : City[]
  cities$: Subscription

  hotels: Hotel[]
  hotels$: Subscription

  formHotels: Hotel[]

  id:number
  formCity: number
  hotelId:number
  price:number
  quantity:number
  date: Date

  insert$:Subscription
  update$:Subscription
  delete$:Subscription

  SLICEBY: number=10
  
  popUpDelete:boolean = false
  constructor(private hotelService: GraphqHotelService,
    private chatService: ChatServiceService,
    private userService: GraphqpUserService,
    private router:Router
) { }

  user: User
  user$:Subscription
  getUser(): void {
    if (sessionStorage.getItem("user") == null) {
      alert("you must be a admin or login first")
      this.router.navigateByUrl('/')
    }
    let temp = JSON.parse(sessionStorage.getItem("user"))
    if (temp.isAdmin == false) {
      alert("you must be a admin or login first")
      this.router.navigateByUrl('/')

    }
    this.user$ = this.userService.getUserById(temp.id).subscribe(
      q => {
        this.user = q.data.userById
        if (this.user.id != 0) {
         // DO SOMETHING HERE

        }
        else {
          alert("not valid user")
          this.router.navigateByUrl('')
        }
      }
    )
  }
  ngOnInit() { 
    this.getUser()



    this.id=-1
    this.getAllHotelTickets()
    this.getHotels()
    this.formHotels=[]
    this.getCities()
    this.setModal()
    setTimeout(()=>{
      document.getElementById("loading-page").style.display="none"
    },3000)

    this.chatService.listen('waitForNewHotel').subscribe(msg => {
      alert("NEW HOTEL IS COMINGG RELOAD TO SEE THAT")
      console.log('test')
    })
  }
  emitNewEvent(): void {
    this.chatService.emit("waitForNewHotel", "hehe")
  }
  from:number=0;
  hotelPage:number;
  setData():void{
    this.hotelTickets  = this.savedHotelTickets.slice(this.from*this.SLICEBY, (this.from*this.SLICEBY)+this.SLICEBY)  
  }

  prevHotelPage():void{
    if(this.from == 0){
      return
    }
    this.from--
    this.setData();
  }
  nextHotelPage():void{
    if(this.from == this.hotelPage -1){
      return
    }
    this.from++
    this.setData()
  }
  setHotelPage(i: number):void{
    this.from = i
    this.setData();
  }





  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
      this.hotelTickets$.unsubscribe()
      this.cities$.unsubscribe()
      this.hotels$.unsubscribe()
      // this.insert$.unsubscribe()
      
  }

  setModal():void{
    let modal = document.getElementById("modal")
    let btn = document.getElementById("showForm")
    btn.onclick =()=>{
      this.formCity = -1
      
      this.hotelId = null
      // init routes
      
      //
      
      this.date = null
      this.price = 0
      this.quantity = null
      modal.style.display = "flex"
    }
    window.onclick = (event)=>{
      if(event.target == modal){
        
        modal.style.display=  "none"
      }
    }
  }

  getCities():void{
    this.cities$ = this.hotelService.getCities().subscribe(
      query=> {
        // await query.data.cities
        this.cities = query.data.cities
        this.cities = this.cities.sort((a, b) => {
          if (a.region.regionName< b.region.regionName) return -1;
          else if (a.region.regionName > b.region.regionName) return 1;
          else return 0;
        });
      }
    )
  }
  getHotels():void{
    this.hotels$ = this.hotelService.getHotels().subscribe(
      query=>{
        // console.log(query.data)
        this.hotels = query.data.hotels
        console.log(this.hotels)
        console.log(query.data)
      }
    )
  }
  getHotelsAfterChooseCity(id:number):void{
    this.formHotels=[]
    for(let i=0; i<this.hotels.length; i++){
      if(this.hotels[i].city.id ==id ){
        this.formHotels.push(this.hotels[i])
      }
    }
  }
  getPriceAfterChooseHotel(index:number):void{
    this.price = this.formHotels[index].price
    this.quantity = this.formHotels[index].quantity
  }

  
  getAllHotelTickets(): void {
    this.hotelTickets$ = this.hotelService.getHotelTickets().subscribe( query => {

      console.log(query.data)
      this.hotelTickets = query.data.hotelTickets
      console.log(this.hotelTickets)
      for (let i = 0; i < this.hotelTickets.length; i++) {
        let total = 0;
        for (let j = 0; j < this.hotelTickets[i].hotel.ratings.length; j++) {
          total += this.hotelTickets[i].hotel.ratings[j].rateScore
        }
        total /= this.hotelTickets[i].hotel.ratings.length
        this.hotelTickets[i].hotel.ratingNumber = total
      }

      this.allHotelTickets = this.hotelTickets
      this.savedHotelTickets = this.hotelTickets
      this.hotelTickets=[]
      this.hotelPage = Math.ceil(this.savedHotelTickets.length/this.SLICEBY)
      console.log(this.savedHotelTickets)
      this.setData()
      this.setFilter()
    } )
  }

  insert():void{
    if(this.id!=-1){
      alert("you are suppose to update")
      return
    }
    if(this.formCity == null){
      alert("please select a city")
      return
    }
    if(this.hotelId == null){
      alert("please select a hotel")
      return
    }
    if(this.price <= 0 || this.price == null){
      alert("please insert price")
      return
    }

    if(this.quantity <=0){
      alert("please insert quantity")
      return
    }
    this.insert$ = this.hotelService.insertHotelTicket(
      this.hotelId,this.date.toString(), this.quantity, parseFloat(this.price.toString())
    ).subscribe(query=>{
      let temp = query.data.insertHotelTicket
      if(temp.id ==0 || temp== null){
        alert("fail to insert")
      }else{
        alert("sucess")
        this.emitNewEvent()
      }
    })
  }
  
  update():void{
    if(this.id==-1){
      alert("you are suppose to insert")
      return
    }
    if(this.formCity == null){
      alert("please select a city")
      return
    }
    if(this.hotelId == null){
      alert("please select a hotel")
      return
    }
    if(this.price <= 0 || this.price == null){
      alert("please insert price")
      return
    }

    if(this.quantity <=0){
      alert("please insert quantity")
      return
    }
    this.update$ = this.hotelService.updateHotelTicket(this.id,
      this.hotelId,this.date.toString(), this.quantity, parseFloat(this.price.toString())
    ).subscribe(query=>{
      let temp = query.data.updateHotelTicket
      console.log(query.data)
      if(temp.id ==0 || temp== null){
        alert("fail to insert")
      }else{
        alert("success")
      
        this.emitNewEvent()
      }
    })
  }

  showUpdate(i:number){
    this.id=this.hotelTickets[i].id
    let modal = document.getElementById("modal")
    
    this.formCity = this.hotelTickets[i].hotel.area.city.id
    this.getHotelsAfterChooseCity(this.formCity);
    this.hotelId = this.hotelTickets[i].hotel.id
    this.price = this.hotelTickets[i].price
    this.quantity = this.hotelTickets[i].quantity
    this.date = new Date(this.hotelTickets[i].date)
    modal.style.display="flex"

  }

  closePopUp(){
    console.log("helo")
    this.popUpDelete=false
  }
  
  openPopUp(hehe: number){
    this.id = hehe
    this.popUpDelete=true
    console.log(this.id)
  }

  sureDelete(){
    console.log(this.id)
    this.delete$= this.hotelService.deleteHotelTicket(this.id).subscribe(
      mutate =>{
        console.log(mutate.data)
        let temp = mutate.data.deleteHotelTicket
        if(temp.id == 0 || temp == null){
          alert("fail to delete")
        }else{
          alert("success")
        }
        window.location.reload()
      }

    )
    this.popUpDelete=false
  }
  






/////////////////////////////////FILTER

  hotelsFilter:Hotel[]
  hotelsFilterBoolean : Boolean[]
  hotelsFilterBoolean2 : Boolean[]
  

  facilityFilter: Facility[]
  facilityFilterBoolean:Boolean[]
  facilityFilterBoolean2: Boolean[]

  starFilterBoolean: Boolean[]
  starFilterBoolean2: Boolean[]

  priceFilter:number=0;
  priceFilterBoolean: boolean =false
  //init filter

  reset():void{
    for(let i=0; i<this.hotelsFilterBoolean.length; i++){
      this.hotelsFilterBoolean[i] =false;
      this.hotelsFilterBoolean2[i] =false;
    }
    for(let i=0; i<this.facilityFilterBoolean.length; i++){
      this.facilityFilterBoolean[i] = false
      this.facilityFilterBoolean2[i] = false
    }
    for(let i=0; i<this.starFilterBoolean.length; i++){
      this.starFilterBoolean[i] = false;
      this.starFilterBoolean2[i] = false;
    }
    this.priceFilter = 0;
    this.priceFilterBoolean=false
    this.from=0;
    this.validateAllFilter();

  }

  setFilter():void{
    this.getHotelFilter()
    this.getFacilityFilter()
    this.getStarFilter()
  }
  // validate filter
  validateAllFilter():void{
    this.hotelTickets =[]
    this.savedHotelTickets= []
    this.checkHotelBoolean()
    this.checkFilterBoolean()
    this.checkStarFilter()
    this.checkPrice()
    this.from=0
    this.setData()
  }

  //hotel
  markHotel(i:number):void{
    this.hotelsFilterBoolean[i] = !this.hotelsFilterBoolean[i]
    this.validateAllFilter()
  }
  checkHotelBoolean():void{
    let flag=0;
    for(let i=0; i<this.hotelsFilterBoolean.length; i++){
      if(this.hotelsFilterBoolean[i]==true){
        flag=1
        break;
      }
    }
    if(flag==0){
      this.savedHotelTickets = this.allHotelTickets
    }else{
      for(let i=0; i<this.hotelsFilterBoolean.length; i++){
        if(this.hotelsFilterBoolean[i]==false)continue
        for(let j=0; j<this.allHotelTickets.length; j++){
          if(this.hotelsFilter[i].id == this.allHotelTickets[j].hotel.id){
            this.savedHotelTickets.push(this.allHotelTickets[j])
            console.log(this.allHotelTickets[j])
          }
        }
      }
    }
  }
  getHotelFilter():void{
    this.hotelsFilter=[]
    for(let i=0; i<this.hotelTickets.length; i++){
      let flag=0;
      for(let j=0; j<this.hotelsFilter.length; j++){
        if(this.hotelsFilter[j].id == this.hotelTickets[i].hotel.id){
          flag=1;
          break;
        }
      }
      if(flag==0){
        this.hotelsFilter.push(this.hotelTickets[i].hotel)
      }
    }
    this.hotelsFilterBoolean = Array(this.hotelsFilter.length)
    this.hotelsFilterBoolean2 = Array(this.hotelsFilter.length)
    for(let i=0; i<this.hotelsFilter.length; i++){
      this.hotelsFilterBoolean[i] = this.hotelsFilterBoolean2[i] =false
    }
  }

  //facility
  markFacility(i:number):void{
    this.facilityFilterBoolean[i] = !this.facilityFilterBoolean[i]
    this.validateAllFilter()
  }
  checkFilterBoolean():void{
    let flag=0;
    
    for(let i=0; i<this.facilityFilterBoolean.length; i++){
      if(this.facilityFilterBoolean[i] == true){
        flag=1;
        break
      }
    }
    if(flag==1){
      let temp = this.savedHotelTickets
      this.savedHotelTickets = []
      for(let i=0; i<this.facilityFilter.length; i++){
        if(this.facilityFilterBoolean[i] == false)continue
        else{
          for(let j=0; j<temp.length; j++){
            let tempFacilities = temp[j].hotel.hotelFacilities
            for(let k=0; k<tempFacilities.length; k++){
              if(this.facilityFilter[i].id == tempFacilities[k].facility.id){
                this.savedHotelTickets.push(temp[j]);
                break
              }
            }
          }

        }
      }
    }
  }
  getFacilityFilter():void{
    this.facilityFilter =[]
    for(let i=0; i<this.allHotelTickets.length; i++){
      let hHotelFacilities = this.allHotelTickets[i].hotel.hotelFacilities
      for(let j=0; j<hHotelFacilities.length; j++){
        let flag=0;
        for(let k=0; k<this.facilityFilter.length; k++){
          if(this.facilityFilter[k].id == hHotelFacilities[j].facility.id){
            
            flag=1
            break;
          }
        }
        if(flag==0){
          this.facilityFilter.push(hHotelFacilities[j].facility)
        }
      }
    }
    this.facilityFilterBoolean = Array(this.facilityFilter.length)
    this.facilityFilterBoolean2 = Array(this.facilityFilter.length)
    for(let i=0; i<this.facilityFilter.length; i++){
      this.facilityFilterBoolean[i] =this.facilityFilterBoolean2[i] = false
    }
  }

  //star
  markStarFilter(i: number):void{
    this.starFilterBoolean[i] = !this.starFilterBoolean[i]
    this.validateAllFilter()
  }
  checkStarFilter():void{
    let flag=0
    for(let i=0; i<5; i++){
      if(this.starFilterBoolean[i] == true){
        flag=1;
        break;
      }      
    }
    if(flag==1){
      let temp = this.savedHotelTickets
      this.savedHotelTickets =[]
      for(let i=0; i<5; i++){
        if(this.starFilterBoolean[i] == true){
          for(let j=0; j<temp.length; j++){
            if(temp[j].hotel.rate == i+1){
              this.savedHotelTickets.push(temp[j])
            }
          }
        }
      }
    }
  }
  getStarFilter():void{
    this.starFilterBoolean = Array(5)
    this.starFilterBoolean2 = Array(5)
    for(let i=0; i<this.starFilterBoolean.length; i++){
      this.starFilterBoolean[i] = this.starFilterBoolean2[i] = false
    }
  }

  //price
  markPriceFilter(event: MatSliderChange):void{
    this.priceFilter = event.value
    this.priceFilterBoolean = true
    this.validateAllFilter()
  }
  checkPrice():void{
    if(this.priceFilterBoolean == true){
      let temp = this.savedHotelTickets
      this.savedHotelTickets = []
      for(let i=0; i<temp.length; i++){
        if(temp[i].price>=this.priceFilter){
          this.savedHotelTickets.push(temp[i])
        }
      }
    }
  }
  
}
