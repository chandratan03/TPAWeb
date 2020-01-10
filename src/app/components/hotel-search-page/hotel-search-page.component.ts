import { Component, OnInit } from '@angular/core';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-hotel-search-page',
  templateUrl: './hotel-search-page.component.html',
  styleUrls: ['./hotel-search-page.component.scss']
})
export class HotelSearchPageComponent implements OnInit {

  constructor(private myService: GraphqpUserService) { }
  hotels$: Subscription
  hotels : Hotel[]

  ngOnInit() {
    this.getHotels();
  }

  getHotels():void{
      this.hotels$ = this.myService.getHotels().subscribe(async query => {
        this.hotels = await query.data.hotels as Hotel[]
        console.log(this.hotels)
      }
      )
  }

}
