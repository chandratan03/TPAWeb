import { Component, OnInit } from '@angular/core';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from 'src/app/models/hotel';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-hotel-search-page',
  templateUrl: './hotel-search-page.component.html',
  styleUrls: ['./hotel-search-page.component.scss']
})
export class HotelSearchPageComponent implements OnInit {

  starsBool: boolean[] = new Array(5)
  constructor(
    private myService: GraphqpUserService,
    ) { 
    }
  hotels$: Subscription
  hotels : Hotel[]
  allHotelsData: Hotel[]

  AscOrDscName:number = 0;
  

  ngOnInit() {
    this.getHotels();
    for(let i=0; i<5; i++){
      this.starsBool[i] = false
    }
    // document.onscroll = function(){
    //   if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
    //     this.setData()
    //   }
    // }.bind(this)
  }
  // from :number = 0;

  // setData():void{
  //   let temp = this.allHotelsData.slice(this.from, this.from+5);
  //   this.hotels.push(... temp)
  //   this.from+=5
  // }

 


  getHotels():void{
      this.hotels$ = this.myService.getHotels().subscribe( query => {
        this.hotels = query.data.hotels as Hotel[]
        console.log(this.hotels)  
        this.allHotelsData = this.hotels
        this.hotels = Array(0)
        this.validateAllStars()
      }
      )
  }

  markHotel(index):void{
    this.starsBool[index] = !this.starsBool[index]
    this.validateAllStars()
  }
  validateAllStars():void{
    let flag:number=0;
    for(let i=0; i<5; i++){
      if(this.starsBool[i] == true){
        flag=1
      }
    }

    if(flag==0){
      this.hotels = this.allHotelsData
    }else if(flag==1){
      this.hotels = Array(0)
      this.oneStarFilter()
      this.twoStarsFilter()
      this.threeStarsFilter()
      this.fourStarsFilter()
      this.fiveStarsFilter()
      if(this.AscOrDscName == 1){
        this.sortAscName()
      }else if(this.AscOrDscName == 2){
        this.sortDscName()
      }
    }
  }
  oneStarFilter():void{
    if(this.starsBool[0] == false){
      return
    }
    for(let i=0; i<this.allHotelsData.length; i++){
      if(this.allHotelsData[i].rate == 1){
        this.hotels.push(this.allHotelsData[i])
      } 
    }

  }
  
  twoStarsFilter():void{
    if(this.starsBool[1] == false){
      return
    }
    for(let i=0; i<this.allHotelsData.length; i++){
      if(this.allHotelsData[i].rate == 2){
        this.hotels.push(this.allHotelsData[i])
      } 
    }
  }
  
  threeStarsFilter():void{
    if(this.starsBool[2] == false){
      return
    }
    for(let i=0; i<this.allHotelsData.length; i++){
      if(this.allHotelsData[i].rate == 3){
        this.hotels.push(this.allHotelsData[i])
      } 
    }
  }
  
  fourStarsFilter():void{
    if(this.starsBool[3] == false){
      return
    }
    for(let i=0; i<this.allHotelsData.length; i++){
      if(this.allHotelsData[i].rate == 4){
        this.hotels.push(this.allHotelsData[i])
      } 
    }
  }
  
  fiveStarsFilter():void{
    if(this.starsBool[4] == false){
      return
    }
    for(let i=0; i<this.allHotelsData.length; i++){
      if(this.allHotelsData[i].rate == 5){
        this.hotels.push(this.allHotelsData[i])
      } 
    }
  }

  sortAscName():void{
    this.AscOrDscName = 1
    this.hotels.sort((a, b) => {
      if (a.hotelName < b.hotelName) return -1;
      else if (a.hotelName > b.hotelName) return 1;
      else return 0;
    });
  }

  sortDscName():void{
    this.AscOrDscName=2
    this.hotels.sort((a, b) => {
      if (a.hotelName > b.hotelName) return -1;
      else if (a.hotelName < b.hotelName) return 1;
      else return 0;
    });
  }





}
