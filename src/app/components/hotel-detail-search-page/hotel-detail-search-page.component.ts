import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { HotelRoom } from 'src/app/models/hotel-room';
import { Subscription } from 'rxjs';
import { HotelRoomBed } from 'src/app/models/hotel-room-bed';
import { Hotel } from 'src/app/models/hotel';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-hotel-detail-search-page',
  templateUrl: './hotel-detail-search-page.component.html',
  styleUrls: ['./hotel-detail-search-page.component.scss']
})
export class HotelDetailSearchPageComponent implements OnInit {

  // @ViewChild('imageSliderContainer', {static:false}) imageSliderContainer: HTMLElement

  isShowImageSlide: boolean;
  prevNextClicked = 0;
  showImageSlide():void{
    // let element = document.getElementById("image-slider-container")
    if (this.prevNextClicked == 1){
      this.prevNextClicked = 0
      return
    }
    this.isShowImageSlide = !this.isShowImageSlide
    this.prevNextClicked=0;
    // this.renderer.setElementStyle(element, "display","flex")
    // console.log("test");
  }

  hotelId: number
  hotelRooms: HotelRoom[]
  hotelRooms$: Subscription

  hotel: Hotel
  hotel$: Subscription
  imagePaths: string[]
  imageShows: boolean[]
  imageLength: number

  ratings: Rating[]
  ratingsPagination: Rating[][]
  ratingPage: boolean[];
  lengthOfRatingPage: number;
  currentRatingPage: number = 0;

  overallRateScore: number

  test:Date
  constructor(private hotelService: GraphqHotelService,
    private renderer: Renderer
    ) {
        
    }
    indexImg: number
    
    
  ngOnInit() {
    this.isShowImageSlide = false;
    // let element = document.getElementById("image-slider-container")
    // console.log(element.style)
    // this.renderer.setElementStyle(element, "display","none")
    this.indexImg=0;
    this.imagePaths = []
    this.hotelId = Number.parseInt(sessionStorage.getItem("hotelId"))
    this.getHotelRoom()
    this.getHotelById(this.hotelId)
    
  }

  getHotelRoom():void{
    this.hotelRooms$ = this.hotelService.getHotelRoomsByHotelId(this.hotelId).subscribe(async query => {
       this.hotelRooms = query.data.hotelRoomByHotelId as HotelRoom[]
       console.log(this.hotelRooms)
       for(let i=0; i<this.hotelRooms.length; i++){
         for(let j=0; j<this.hotelRooms[i].images.length; j++){
          this.imagePaths.push(this.hotelRooms[i].images[j].path)
         }
       }
       this.imageLength = this.imagePaths.length
       this.imageShows = Array(this.imagePaths.length)
       for(let i=0; i<this.imagePaths.length; i++){
        this.imageShows[i] = false
       }
       this.imageShows[0] = true;
     })
  } 

  getHotelById(hotelId: number): void{
    this.hotel$= this.hotelService.getHotelById(hotelId).subscribe(query =>{
      this.hotel = query.data.hotelById
      console.log(query.data.hotelById)
      console.log(this.hotel)
      this.ratings = this.hotel.ratings

      let ratingLength = this.ratings.length
      let sum=0;
      for(let i=0; i<ratingLength; i++){
        sum+= this.ratings[i].rateScore
      }
      sum/=ratingLength
      this.overallRateScore = sum

      let lengthOfRatings = Math.ceil(this.ratings.length/2)
      this.lengthOfRatingPage = lengthOfRatings
      this.ratingPage = Array(lengthOfRatings);
      this.ratingPage[0] = true
      console.log(lengthOfRatings)
      this.ratingsPagination = Array(lengthOfRatings)
      for(let i=0; i<lengthOfRatings; i++){
        if(i>0) this.ratingPage[i] = false
        this.ratingsPagination[i] = []
        this.ratingsPagination[i].push(...this.ratings.slice(i*2, 2*(i+1)))
      }
    })
  }

  getHotelRoomBed(hotelRoom: HotelRoom):HotelRoomBed[]{
    return hotelRoom.hotelRoomBeds
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hotelRooms$.unsubscribe()
  }

  theImage():void{
    this.prevNextClicked=1
  }
  prev(): void{
    this.prevNextClicked=1
    if(this.indexImg ==0){
      this.imageShows[this.indexImg] = false
      this.indexImg = this.imageLength-1
      this.imageShows[this.indexImg] = true
    }else{
      this.imageShows[this.indexImg] = false
      this.indexImg--;
      this.imageShows[this.indexImg] = true
    }
  }
  next(): void{
    this.prevNextClicked=1;
    if(this.indexImg == this.imageLength-1){
      this.imageShows[this.indexImg] = false
      this.indexImg = 0
      this.imageShows[this.indexImg] = true
    }else{
      this.imageShows[this.indexImg] = false
      this.indexImg++;
      this.imageShows[this.indexImg] = true
    }
  }

  ratingGotoPage(i:number): void{
    this.ratingPage[this.currentRatingPage] =false
    this.currentRatingPage = i;
    this.ratingPage[this.currentRatingPage] = true

  }
  prevRating(): void{
    this.ratingPage[this.currentRatingPage] = false;
    
    if(this.currentRatingPage == 0){
      this.currentRatingPage =this.lengthOfRatingPage-1
    
    }else{
      this.currentRatingPage--
    }
    this.ratingPage[this.currentRatingPage] = true;
  }
  nextRating():void{
    this.ratingPage[this.currentRatingPage] = false;
    if(this.currentRatingPage == this.lengthOfRatingPage-1){
      this.currentRatingPage =0
    }else{
      this.currentRatingPage++
    }
    this.ratingPage[this.currentRatingPage] = true;
  }
}
