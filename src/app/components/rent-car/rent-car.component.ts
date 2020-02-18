import { Component, OnInit } from '@angular/core';
import { GraphqCarService } from 'src/app/services/graphq-car.service';
import { Car } from 'src/app/models/car';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.scss']
})
export class RentCarComponent implements OnInit {

  constructor(private service: GraphqCarService) { }
  cars: Car[]
  cars$: Subscription
  carsDistinct: Car[] // for filter
  brands: Brand[]

  minPrice:number
   maxPrice: number
  currentPrice : number
  ngOnInit() {
    this.brands = []
    this.carsDistinct=[]
    this.getCars()
  }
  getCars():void{
    this.cars$ = this.service.getCars().subscribe(query =>{
      this.cars = query.data.cars
      console.log(this.cars)
      this.initBrands()
      this.initDistinctCars()
    })
  }
  initBrands(){
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
    this.minPrice = min
    this.maxPrice = max
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
  }
  updatePrice($event):void{
    this.currentPrice = $event.value
  }

}
