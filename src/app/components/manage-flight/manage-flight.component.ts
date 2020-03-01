import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { GraphqFlightService } from 'src/app/services/graphq-flight.service';
import { FormBuilder } from '@angular/forms';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { City } from 'src/app/models/city';
import { Airline } from 'src/app/models/airline';
import { Airport } from 'src/app/models/airport';
import { Routes } from '@angular/router';
import { Facility } from 'src/app/models/facility';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
// Id				int			`gorm:"primary_key" `
// Airline 		Airline		`gorm:"foreignKey:airline_refer"`
// AirlineRefer	uint `json:"airline_refer"`
// Routes			[]Route `gorm:"foreignKey:route_id"`
// Transit int
// From			Airport		`gorm:"foreignKey:from_refer"`
// FromRefer		uint
// To				Airport		`gorm:"foreignKey:to_refer"`
// ToRefer			uint
// Departure		time.Time
// Arrival 		time.Time
// Duration		uint
// Price			int
// Tax				int
// ServiceCharge	int
export class ManageFlightComponent implements OnInit {

  flights: Flight[]
  saveFlights: Flight[]
  allFlights: Flight[]
  flights$: Subscription
  cities: City[]
  cities$: Subscription
  flightForm: any
  airlines: Airline[]
  airlines$: Subscription
  airports: Airport[]
  airports$:Subscription
  routeId: number[]
  routerCount:number =0
  
  insertFlight$: Subscription
  updateFlight$: Subscription
  deleteFlight$: Subscription

  id: number
  airlineRefer:number
  routes:Routes[]
  transit:number
  fromRefer:number
  toRefer:number
  departureTime= ""
  arrivalTime= ""
  fromDate: Date
  backDate: Date
  price= 0
  tax= 0
  serviceCharge: number
  imagePath:string
  // id: number, airlineRefer:number, routes:number[], transit:number
  // , fromRefer:number, toRefer:number, departure:string, arrival:string, price:number, tax:number, serviceCharge:number
  
  popUpDelete: boolean= false
  


  //filter
  booleanAirlines:boolean[]
  allAirlines: Airline[]

  pageCount: number
  currPage:number
 
  constructor(
    private flightService: GraphqFlightService,
    private formBuilder: FormBuilder,
    private userService: GraphqpUserService,
    private chatService: ChatServiceService,

    ) {
     

     }

  ngOnInit() {
    this.id = -1
    this.routeId = Array(3)
    for(let i=0; i<3; i++){
      this.routeId[i] = -1
    }
    this.getFlights()
    this.getCities()
    this.getAirports()
    this.getAirlines()
    this.setModal()
    setTimeout(()=>{
      document.getElementById("loading-page").style.display="none"
    },2000)

    this.chatService.listen('waitForNewFlight').subscribe(msg => {
      alert("NEW EVENT IS COMINGG RELOAD TO SEE THAT")
      console.log('test')
    })
  }
  emitNewEvent(): void {
    this.chatService.emit("waitForNewFlight", "hehe")
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
    this.deleteFlight$= this.flightService.deleteFlight(this.id).subscribe()
    this.popUpDelete=false
  }
  
  increaseRoute():void{
    if(this.routerCount<3)
    this.routerCount++
    console.log(this.routerCount)
  }
  decreaseRoute():void{
    if(this.routerCount>0)
    this.routerCount--
    console.log(this.routerCount)
  }
  localUrl: any[];
  getImagePath(event: any):void{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      reader.onload = (event: any) => {
        // console.log( event.target.result)
          this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(this.localUrl)
   }
   console.log(this.imagePath)
   console.log(this.localUrl)
  }

  showDetailFlights: boolean[]
  boolDetailPriceBox: boolean[]
  
  doShowUpdateForm(flight: Flight
    ){
      console.log(flight)
      this.id = flight.id
      this.airlineRefer = flight.airline.id
      // init routes
      for(let i=0; i<flight.routes.length; i++){
        this.routeId[i]= flight.routes[i].id
      }
      //
      
      this.transit = flight.routes.length
      this.routerCount = flight.routes.length
      this.fromRefer = flight.from.id
      this.toRefer = flight.to.id
      let hours, minutes;
      this.fromDate = new Date(flight.departure)
      hours = this.fromDate.getHours()
      minutes = this.fromDate.getMinutes()
      if(hours<10){
        hours= "0"+hours
      }
      if(minutes<10){
        minutes= "0"+minutes
      }
      this.departureTime = hours+":"+minutes

      this.backDate = new Date(flight.arrival)
      
      hours = this.backDate.getHours()
      minutes = this.backDate.getMinutes()
      if(hours<10){
        hours= "0"+hours
      }
      if(minutes<10){
        minutes= "0"+minutes
      }
      this.arrivalTime = hours+":"+minutes
      
      
      this.price = flight.price
      this.tax = flight.tax
      this.serviceCharge = flight.serviceCharge
      let modal = document.getElementById("modal")
    
      modal.style.display = "flex" 

    }


  validateTime(time:string):boolean{
    if(time.length != 5){
      alert("wrong time format")
      return false
    }
    if(this.countColon(time) != 1){
      alert("wrong time format")
      return false
    }
    let temp = time.split(":")
    if(isNaN(Number((temp[0])))){
      alert("wrong time format")
      return false
    }
    
    if(isNaN(Number(temp[1] ))){
      alert("wrong time format")
      return false
    }
    if(parseInt(temp[0]) > 24 || parseInt(temp[1]) > 60){
      alert("wrong time")
      return false
    }

    return true
  }

  countColon(time:string):number{
    let colon=0  
    for(let i=0; i<time.length; i++){
      if(time[i] == ':'){
        colon++;
      }
    }
    return colon
  }

  doInsertFlight():void{
    if(this.id!=-1){
      alert("you are suppose not to insert/ but to update")
      return
    }
    if(this.validateTime(this.departureTime) == false){
      return
    }
    if(this.validateTime(this.arrivalTime) == false){
      return
    }

    if(this.airlineRefer == null){
      alert("please input airline")
      return
    }
    if(this.fromRefer ==null || this.toRefer == null){
      alert("please input from and to refer")
      return
    }
    if(this.fromDate == null || this.backDate==null){
      alert("please input date")
      return
    }
    
    if(this.price<=0 || this.tax<=0 || this.serviceCharge <=0){
      alert("please input price, tax, serviceCharge")
      return
    }
    let depTime =this.departureTime.split(":")
    let arrTime = this.arrivalTime.split(":")
    

    this.fromDate.setHours(parseInt(depTime[0]))
    this.fromDate.setMinutes(parseInt(depTime[1]))
    
    this.backDate.setHours(parseInt(arrTime[0]))
    this.backDate.setMinutes(parseInt(arrTime[1]))
    if(this.fromDate.getTime() > this.backDate.getTime()){
      alert("please input valid date or time")
      return
    }
    
    
    let depDate = this.fromDate.toString() 
    let arrDate = this.backDate.toString()

    this.transit = this.routeId.length
    // let duration =  (this.fromDate.getHours() *60 + this.fromDate.getMinutes()) - (this.backDate.getHours()*60 + this.backDate.getMinutes()) 

    var duration = Math.abs(Math.round((this.backDate.getTime() - this.fromDate.getTime()) /1000 / 60 ))//TO MINUTES
    console.log(this.fromDate.getTime())
    console.log(this.backDate.getTime())
    console.log(duration)

    this.insertFlight$ = this.flightService.insertFlight(this.airlineRefer, 
      this.routeId, this.transit, this.fromRefer, this.toRefer,
      depDate, arrDate, duration,this.price,this.tax, this.serviceCharge).subscribe(mutate => {

        let temp = mutate.data.createFlight as Flight
        console.log(temp)
        if(temp == null || temp.id == 0){
          alert("fail")
        }else{
          alert("success")
        }
        

      })

    console.log("hehe")
    console.log(this.arrivalTime)
    // console.log(arrDate)  
    this.emitNewEvent()
  }

  setModal():void{
    
    let modal = document.getElementById("modal")
    let btn = document.getElementById("showForm")
    btn.onclick =()=>{
      this.id = -1
      
      this.airlineRefer = null
      // init routes
      
      //
      
      this.transit = 0
      this.routerCount = 0
      this.fromRefer = 0
      this.toRefer = 0
      let hours, minutes;
      this.fromDate =null

      this.departureTime = null

      this.backDate = null
      
     
      this.arrivalTime = null
      
      
      this.price = 0
      this.tax = 0
      this.serviceCharge = 0
      modal.style.display = "flex"
    }
    window.onclick = (event)=>{
      if(event.target == modal){
        
        modal.style.display=  "none"
      }
    }



  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cities$.unsubscribe()
    this.flights$.unsubscribe()
  }
  getAirports():void{
    this.airports$ = this.flightService.getAirports().subscribe(query=>{
      this.airports = query.data.airports
      console.log(query.data.airports)
    })
  }
  getAirlines():void{
    this.airlines$ = this.flightService.getAirlines().subscribe(query=>{
      this.airlines = query.data.airlines
      console.log(query.data.airlines)
      this.booleanAirlines = Array(this.airlines.length)
      this.allAirlines = this.airlines
      for(let i=0; i<this.airlines.length; i++){
        this.booleanAirlines[i] = false;
      }
    })
  }

  getCities():void{
    this.cities$ = this.userService.getCities().subscribe(query =>{
      this.cities = query.data.cities
      console.log(query.data.cities)
    })
  }
  getFlights():void{
    this.flights$ = this.flightService.getFlights().subscribe(query=>{
      this.flights = query.data.flights
      this.showDetailFlights = Array(this.flights.length)
      this.boolDetailPriceBox=Array(this.flights.length)
      for(let i=0; i<this.flights.length; i++){
        this.showDetailFlights[i] = false;
        this.boolDetailPriceBox[i] = false
      }
      this.pageCount = Math.ceil(this.flights.length/10)
      this.saveFlights = this.flights
      this.allFlights = this.flights
      this.flights =[]
      this.currPage=0
      this.setData(this.currPage)
      console.log(query.data.flights)
    })
  }


  update():void{
    if(this.validateTime(this.departureTime) == false){
      return
    }
    if(this.validateTime(this.arrivalTime) == false){
      return
    }

    if(this.airlineRefer == null){
      alert("please input airline")
      return
    }
    if(this.fromRefer ==null || this.toRefer == null){
      alert("please input from and to refer")
      return
    }
    if(this.fromDate == null || this.backDate==null){
      alert("please input date")
      return
    }
    
    if(this.price<=0 || this.tax<=0 || this.serviceCharge <=0){
      alert("please input price, tax, serviceCharge")
      return
    }
    let depTime =this.departureTime.split(":")
    let arrTime = this.arrivalTime.split(":")
    

    this.fromDate.setHours(parseInt(depTime[0]))
    this.fromDate.setMinutes(parseInt(depTime[1]))
    
    this.backDate.setHours(parseInt(arrTime[0]))
    this.backDate.setMinutes(parseInt(arrTime[1]))
    if(this.fromDate.getTime() > this.backDate.getTime()){
      alert("please input valid date or time")
      return
    }
    
    
    let depDate = this.fromDate.toString() 
    let arrDate = this.backDate.toString()

    this.transit = this.routeId.length
    // let duration =  (this.fromDate.getHours() *60 + this.fromDate.getMinutes()) - (this.backDate.getHours()*60 + this.backDate.getMinutes()) 

    var duration = Math.abs(Math.round((this.backDate.getTime() - this.fromDate.getTime()) /1000 / 60 ))//TO MINUTES
    console.log(this.fromDate.getTime())
    console.log(this.backDate.getTime())
    console.log(duration)

    this.updateFlight$ = this.flightService.updateFlight(this.id,this.airlineRefer, 
      this.routeId, this.transit, this.fromRefer, this.toRefer,
      depDate, arrDate, duration,this.price,this.tax, this.serviceCharge).subscribe(m=>{
        this.emitNewEvent()
      })

  }


  setData(i:number):void{
    this.currPage=i;
    this.flights=[]
    let temp = this.saveFlights.slice(this.currPage*10, (this.currPage*10)+10)
    this.flights.push(...temp)
  }







  //FILTER

  markAirline(i:number){
    this.booleanAirlines[i] = !this.booleanAirlines[i]
    
    this.checkAllFilter()
  }
  nextPage(){
    if(this.currPage == this.pageCount-1)
      return
    this.currPage++
    this.setData(this.currPage)
  }
  prevPage(){
    if(this.currPage!=0){
      this.currPage--
    }
    this.setData(this.currPage)
  }

  checkAirlines():void{
    let flag=0;
    for(let i=0; i<this.booleanAirlines.length; i++){
      if(this.booleanAirlines[i] == true){
        flag=1;
        break;
      }
    }
    if(flag==0){
      this.flights = this.allFlights
      this.saveFlights = this.allFlights
    }else{
      for(let i=0; i<this.booleanAirlines.length; i++){
        if(this.booleanAirlines[i]==false)
          continue
        for(let j=0; j<this.allFlights.length; j++){
          if(this.allFlights[j].airline.id == this.airlines[i].id){
            this.saveFlights.push(this.allFlights[j])
          }
        }
      }
    }
  }
 
  checkAllFilter():void{
    this.flights=[]
    this.saveFlights=[]
    this.currPage=0
    this.checkAirlines()
  
    this.pageCount = Math.ceil(this.saveFlights.length/10)
    this.setData(this.currPage)
  }


}
