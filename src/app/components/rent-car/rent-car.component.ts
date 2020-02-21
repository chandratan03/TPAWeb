import { Component, OnInit } from '@angular/core';
import { GraphqCarService } from 'src/app/services/graphq-car.service';
import { Car } from 'src/app/models/car';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ThrowStmt } from '@angular/compiler';
import { City } from 'src/app/models/city';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.scss']
})
export class RentCarComponent implements OnInit {

  constructor(private service: GraphqCarService,
    private cityService: GraphqpUserService
    ) { }
  allCars: Car[]
  cars: Car[]
  showCars: Car[]


  cars$: Subscription
  carsDistinct: Car[] // for filter
  modelBoolean: boolean[]
  modelBoolean2: boolean[]
  

  brands: Brand[]
  brandsBoolean: boolean[]
  brandsBoolean2: boolean[]
  
  minPrice:number
   maxPrice: number
  currentPrice : number
  
  passenger:number =-1
  from:number=0;

  showVendor: Boolean[]

// search
  cityId: number
  fromDate: Date
  backDate: Date
  quantity: number
//Card


  filterCapacity:boolean =true
  filterPrice:boolean = true
  filterBrand: boolean = true
  filterModel:boolean = true

  cities: City[]
  cities$: Subscription
  ngOnInit() {
    this.brands = []
    this.carsDistinct=[]
    this.brandsBoolean=[]
    this.modelBoolean=[]
    this.showCars=[]
    this.showVendor=[]

    let json = JSON.parse(sessionStorage.getItem("carQuery"))
    this.cityId = json["cityId"]
    console.log(this.cityId)
    this.fromDate = new Date(json["fromDate"])
    this.backDate = new Date(json["backDate"])
    this.quantity = json["quantity"]
    this.getCars()
    this.getCities()
    document.onscroll = function () {
      if (window.scrollY + window.innerHeight + window.innerHeight * 20 / 100 >= document.body.scrollHeight) {

        this.setData()
      }
    }.bind(this)
    
  }
  //////////////////////////
  /** */ 

  getCities():void{
    this.cities$ = this.cityService.getCities().subscribe(query => {
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
    window.location.reload()
  
  }

  ////////////////
  
  setData():void{
    if (this.from >= this.cars.length) {
      return
    }
    let temp = this.cars.slice(this.from, this.from + 3)
    // console.log(temp)
    this.showCars.push(...temp)
    this.from += 3  
  }
  getCars():void{
    this.cars$ = this.service.getCarsByCityId(this.cityId).subscribe(query =>{
      this.cars = query.data.CarsByCity
      // console.log(query.data.CarsByCity)
      this.allCars = this.cars
      console.log(this.cars)
      this.initBrands()
      this.initDistinctCars()
      this.setData()
    })
  }
  initShowVendor(){
    this.showVendor = Array(this.allCars.length);
    for(let i=0; i<this.allCars.length; i++){
      this.showVendor[i] = false
    }    
  }
  initBrands():void{ // init price at here
    let n= this.cars.length

    let max, min
    for(let i=0; i<n; i++){
      let flag=0;
      if(i==0){
        max = this.cars[i].price
        min = this.cars[i].price
      }else{
        if(max < this.cars[i].price){
          max = this.cars[i].price
        }
        if(min>this.cars[i].price){
          min = this.cars[i].price
        }

      }
      for(let j=0; j<this.brands.length; j++){
        if(this.cars[i].brand.id == this.brands[j].id){
          flag=1
          break
        }
      }
      if(flag==0){
        this.brands.push(this.cars[i].brand)
      }
    }
    console.log(this.brands)
    this.brandsBoolean = Array(this.brands.length)
    this.brandsBoolean2 = Array(this.brands.length)
    for(let i=0; i>this.brands.length; i++){
      this.brandsBoolean[i]= false
      this.brandsBoolean2[i]= false
    }
    this.minPrice = min
    this.maxPrice = max
    this.currentPrice = min

  }
  initDistinctCars():void{
    let n= this.cars.length
    for(let i=0; i<n; i++){
      let flag=0;
      for(let j=0; j<this.carsDistinct.length; j++){
        if(this.cars[i].id == this.carsDistinct[j].id){
          flag=1
          break
        }
      }
      if(flag==0){
        this.carsDistinct.push(this.cars[i])
      }
    }
    this.modelBoolean = Array(this.carsDistinct.length)
    this.modelBoolean2 = Array(this.carsDistinct.length)
    for(let i=0 ; i<this.carsDistinct.length; i++){
      this.modelBoolean[i] = false
      this.modelBoolean2[i] = false
    }
  }


  reset():void{
    for(let i=0; i<this.modelBoolean2.length; i++){
      this.modelBoolean[i] = false
      this.modelBoolean2[i] =false
    }
    for(let i=0; i<this.brandsBoolean.length; i++){
      this.brandsBoolean[i] = false
      this.brandsBoolean2[i] = false
    }
    this.currentPrice = this.minPrice
    this.passenger=-1

    this.updateAll()
    
  }
  slidePrice($event):void{
    this.currentPrice = $event.value
    this.updateAll()
  }
  passengerCheck(i:number){
    this.passenger = i
    this.updateAll()
  }
  checkBrand(i:number){
    this.brandsBoolean[i] = !this.brandsBoolean[i]
    this.updateAll()
  }
  checkModel(i:number){
    this.modelBoolean[i] = !this.modelBoolean[i]
    this.updateAll()
  }
  

  updateAll():void{
    this.from=0
    this.showCars=[]
    this.updatePassenger()
    this.updatePrice()
    this.updateBrand()
    this.updateModel()
    this.setData()
  }
  
  updatePassenger():void{
    if(this.passenger == -1){ // all 
      this.cars = this.allCars
      return
    }
    let carsTemp =[]
    if(this.passenger == 1){
      for(let i=0; i<this.allCars.length; i++){
        if(this.allCars[i].capacity < 5){
          carsTemp.push(this.allCars[i])
        }
      }
      this.cars = carsTemp
    }else if(this.passenger == 2){
      for(let i=0; i<this.allCars.length; i++){
        if(this.allCars[i].capacity >= 5  && this.allCars[i].capacity <= 6 ){
          carsTemp.push(this.allCars[i])
        }
      }
      this.cars = carsTemp
    }else if(this.passenger == 3){
      for(let i=0; i<this.allCars.length; i++){
        if(this.allCars[i].capacity > 6){
          carsTemp.push(this.allCars[i])
        }
      }
      this.cars = carsTemp
    }
  }
  updatePrice():void{
    let carTemp= []
    for(let i=0; i<this.cars.length; i++){
      if(this.cars[i].price >= this.currentPrice){
        carTemp.push(this.cars[i])
      }
    }
    this.cars = carTemp
  }
  checkAllBrand():boolean{
    for(let i=0; i<this.brandsBoolean.length; i++){
      if(this.brandsBoolean[i] == true)
        return true
    }
    return false;
  }
  updateBrand():void{
    if(this.checkAllBrand()){
      let carTemp= []
      for(let i=0; i<this.brandsBoolean.length; i++){
        if(this.brandsBoolean[i] == true){
          for(let j=0; j<this.cars.length; j++){
            if(this.cars[j].brand.id == this.brands[i].id){
              carTemp.push(this.cars[j])
            }
          }
        }
      }
      this.cars= carTemp
    }
  }
  checkAllModel():boolean{
    for(let i=0; i<this.modelBoolean.length; i++){
      if(this.modelBoolean[i] == true){
        return true
      }
    }
    return false
  }
  updateModel():void{
    if(this.checkAllModel() == false){
      
      return
    }
    let carTemp=[]
    for(let i=0; i<this.carsDistinct.length; i++){
      if(this.modelBoolean[i] == false){
        continue
      }
      for(let j=0; j<this.cars.length; j++){
        if(this.cars[j].id == this.carsDistinct[i].id){
          console.log("test")
          console.log(this.cars[j].id +"    -- " + this.carsDistinct[i].id)
          carTemp.push(this.cars[j])
        }
      }
    }
    this.cars =carTemp
  }

  sortByPriceAsc():void{
    this.cars = this.cars.sort((a,b)=>(a.price>b.price?1:-1))
    this.from=0
    this.showCars = []
    this.setData()

  }
  sortByPriceDsc():void{
    this.cars = this.cars.sort((a,b)=>(a.price>b.price?-1:1))
    this.from=0
    this.showCars = []
    this.setData()
  }
  sortByBrandAsc():void{
    this.cars = this.cars.sort((a,b)=>(a.brand.name.localeCompare(b.brand.name)))
    this.from=0
    this.showCars = []
    this.setData()
  }
  sortByBrandDsc():void{
    this.cars = this.cars.sort((a,b)=>(b.brand.name.localeCompare(a.brand.name)))
    this.from=0
    this.showCars = []
    this.setData()
  }
  sortByModelAsc():void{
    this.cars = this.cars.sort((a,b)=>(a.model.localeCompare(b.model)))
    this.from=0
    this.showCars = []
    this.setData()
  }
  sortByModelDsc():void{
    this.cars = this.cars.sort((a,b)=>(b.model.localeCompare(a.model)))
    this.from=0
    this.showCars = []
    this.setData()
  }
  sortByCapacityAsc():void{
    this.cars = this.cars.sort((a,b)=>(a.capacity>b.capacity?-1:1))
    this.from=0
    this.showCars = []
    this.setData()
  }
  sortByCapacityDsc():void{
    this.cars = this.cars.sort((a,b)=>(a.capacity<b.capacity?-1:1))
    this.from=0
    this.showCars = []
    this.setData()
  }


}
