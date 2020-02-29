import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { HotelRoom } from 'src/app/models/hotel-room';
import { Subscription } from 'rxjs';
import { HotelRoomBed } from 'src/app/models/hotel-room-bed';
import { Hotel } from 'src/app/models/hotel';
import { Rating } from 'src/app/models/rating';
import { Router, ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
@Component({
  selector: 'app-hotel-detail-search-page',
  templateUrl: './hotel-detail-search-page.component.html',
  styleUrls: ['./hotel-detail-search-page.component.scss']
})
export class HotelDetailSearchPageComponent implements OnInit {

  // @ViewChild('imageSliderContainer', {static:false}) imageSliderContainer: HTMLElement
  URL : string;
  FACEBOOKURL: string

  map:L.Map=null
  
  hotels: Hotel[]
  markers =  []
  iconMarker = L.divIcon({
    class:"marker",
    html: "<img src='../../../assets/map/marker-icon.png' alt=''>" ,
    iconSize: [20, 20],
    iconAnchor: [20,20],
  })


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
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute
    ) {
        
    }
    indexImg: number
    
    
  ngOnInit() {
    
    this.URL = window.location.href
    this.FACEBOOKURL = "https://www.facebook.com/sharer/sharer.php?u="+this.URL;
    this.isShowImageSlide = false;
    // let element = document.getElementById("image-slider-container")
    // console.log(element.style)
    // this.renderer.setElementStyle(element, "display","none")
    this.indexImg=0;
    this.imagePaths = []
    this.hotelId =+this.route.snapshot.paramMap.get("id")
    this.getHotelRoom()
    this.getHotelById(this.hotelId)
    



    // init btn
    
    let fbUrl = this.FACEBOOKURL
    let fbBtn = document.getElementById("facebook");
    fbBtn.onclick = function(){
      window.open(fbUrl , "_blank")
    }

    let linkBtn = document.getElementById("link");
    linkBtn.onclick = ()=>{
      navigator.clipboard.writeText(this.URL);
    }
    let googleUrl = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body='+this.URL+'&ui=2&tf=1&pli=1'
    let emailBtn = document.getElementById("email")
    emailBtn.onclick = ()=>{
      window.open(googleUrl, "_black")
    }
   
  }

  getHotelByNearest():void{
    this.hotel
    this.hotelService.getNearestHotel(this.hotel.longitude, this.hotel.latitude).subscribe(q=>{
      this.hotels =q.data.nearestHotels
      this.setModal()
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
      this.getHotelByNearest()
      // this.setModal()
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

  orderNow(i: number): void {
    let id = this.hotels[i].id
    // sessionStorage.setItem("hotelId", id.toString())
    this.router.navigate(["hotel/search/detail", id])
  }
}
