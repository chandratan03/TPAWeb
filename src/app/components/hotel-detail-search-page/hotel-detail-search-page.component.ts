import { Component, OnInit } from '@angular/core';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { HotelRoom } from 'src/app/models/hotel-room';
import { Subscription } from 'rxjs';
import { HotelRoomBed } from 'src/app/models/hotel-room-bed';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-hotel-detail-search-page',
  templateUrl: './hotel-detail-search-page.component.html',
  styleUrls: ['./hotel-detail-search-page.component.scss']
})
export class HotelDetailSearchPageComponent implements OnInit {

  hotelId: number
  hotelRooms: HotelRoom[]
  hotelRooms$: Subscription

  hotel: Hotel
  hotel$: Subscription

  constructor(private hotelService: GraphqHotelService) { }


  ngOnInit() {
    this.hotelId = Number.parseInt(sessionStorage.getItem("hotelId"))
    this.getHotelRoom()
    this.getHotelById(this.hotelId)
  }

  getHotelRoom():void{
    this.hotelRooms$ = this.hotelService.getHotelRoomsByHotelId(this.hotelId).subscribe(async query => {
       this.hotelRooms = query.data.hotelRoomByHotelId as HotelRoom[]
       console.log(this.hotelRooms)
     })
  } 

  getHotelById(hotelId: number): void{
    this.hotel$= this.hotelService.getHotelById(hotelId).subscribe(query =>{
      this.hotel = query.data.hotelById
      console.log(this.hotel)
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

}
