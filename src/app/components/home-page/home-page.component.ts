import { Component, OnInit } from '@angular/core';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { Hotel } from 'src/app/models/hotel';
import { Subscription } from 'rxjs';
import { LocationServiceService } from 'src/app/services/location-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],

})
export class HomePageComponent implements OnInit {

  constructor(
    private hotelService: GraphqHotelService,
    private positionService: LocationServiceService

  ) { }

  hotels: Hotel[]
  hotels$: Subscription
  quickCardIsClicked: boolean = false

  long: any =0
  lat: any=0
  // quickCardElement: HTMLElement
  // overlayElement: HTMLElement

  ngOnInit() {
    // this.positionService.getLocation()
    this.getLocation()
   
    // this.quickCardElement = document.getElementById("quick-card")
    // this.overlayElement = document.getElementById("overlay")
  }


  quickCardClicked(quickCard: HTMLElement, overlay: HTMLElement): void {
    console.log("asd")
    if (this.quickCardIsClicked == false) {
      this.quickCardIsClicked = true
      // this.quickCardElement.style.zIndex = "11"
      // this.overlayElement.style.display = "block"
      // this.overlayElement.style.zIndex = "10"
      quickCard.style.zIndex = "11";
      overlay.style.zIndex = "10"
      overlay.style.display = "block"
    }
  }


  overlayClicked(quickCard: HTMLElement, overlay: HTMLElement) {
    if (this.quickCardIsClicked == true) {
      this.quickCardIsClicked = false
      quickCard.style.zIndex = "5"
      overlay.style.zIndex = "-20"
      overlay.style.display = "none"
    }
  }

  sendMessage(): void {
    window.open("https://api.whatsapp.com/send?phone=082172207470", "")
  }

  getNearestHotels(): void {
    console.log(this.long)
    console.log(this.lat)
    this.hotels$ = this.hotelService.getNearestHotel(this.long, this.lat).subscribe(q => {
      console.log(q.data)
    })
  }

  getLocation(): void {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }
  showPosition(position) {
    // console.log(position.coords.latitude)
    this.lat = position.coords.latitude
    this.long = position.coords.longitude;
    this.getNearestHotels()
  }

}
