import { Component, OnInit } from '@angular/core';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { City } from 'src/app/models/city';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rentcar-card',
  templateUrl: './rentcar-card.component.html',
  styleUrls: ['./rentcar-card.component.scss']
})
export class RentcarCardComponent implements OnInit {

  constructor(public myService: GraphqpUserService) { }
  cities: City
  cities$: Subscription

  ngOnInit() {
    this.getCities()
  }
  getCities():void{
    this.cities$ = this.myService.getCities().subscribe(query => {
      this.cities = query.data.cities
      // console.log(query.data)
    })
  }
}
