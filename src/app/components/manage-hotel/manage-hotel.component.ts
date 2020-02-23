import { Component, OnInit } from '@angular/core';
import { HotelTicket } from 'src/app/models/hotel-ticket';
import { Subscription } from 'rxjs';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { City } from 'src/app/models/city';
import { Hotel } from 'src/app/models/hotel';
import { query } from '@angular/animations';
import { HotelFilterComponent } from '../hotel-filter/hotel-filter.component';

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
  constructor(private hotelService: GraphqHotelService) { }

  ngOnInit() {
    this.id=-1
    this.getAllHotelTickets()
    this.getHotels()
    this.formHotels=[]
    this.getCities()
    this.setModal()
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
    })
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
  
  setFilter():void{
    this.getHotelFilter()
  }
  validateAllFilter():void{
    
  }

  markHotel(i:number):void{
    this.hotelsFilterBoolean[i] = this.hotelsFilterBoolean[i]
    this.validateAllFilter()
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

 


}
