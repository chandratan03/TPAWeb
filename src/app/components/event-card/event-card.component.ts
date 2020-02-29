import { Component, OnInit } from '@angular/core';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { City } from 'src/app/models/city';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/models/region';
import { Route } from 'src/app/models/route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  constructor(
    private hotelService: GraphqHotelService,
    private router: Router
  ) { }

  allCities: City[]
  allCities$: Subscription
  cities: City[]
  cities$: Subscription



  regions: Region[]
  regions$: Subscription

  categories: String[]

  selectedCity: City
  selectedCategory: string


  dropDownBoolean: boolean = false


  ngOnInit() {
    this.selectedCity = new City()
    this.categories = [
      "semua",
      "activity",
      "attraction",
      "event"
    ]
    this.getCities()
    this.getRegions()
  }


  getCitiesByRegion(index: number): void {
    this.cities = []
    for (let i = 0; i < this.allCities.length; i++) {
      if (this.allCities[i].region.id == this.regions[index].id) {
        this.cities.push(this.allCities[i])
      }
    }
  }
  selectACity(i: number) {
    this.selectedCity = this.cities[i]
    this.dropDownBoolean = !this.dropDownBoolean
  }


  getRegions(): void {
    this.regions$ = this.hotelService.getRegions().subscribe(q => {
      this.regions = q.data.regions
    })
  }
  getCities(): void {
    this.allCities$ = this.hotelService.getCities().subscribe(q => {
      this.allCities = q.data.cities
      console.log(this.allCities)
    })
  }

  searchPage(): void {
    let category = this.selectedCategory
    let cityId = this.selectedCity.id
    console.log(cityId == null)

    if (cityId == null && category!=null) {
      this.router.navigate(['event/search', { category:category }]);
    } else {
      if (category == 'semua' && cityId   == null) {
        this.router.navigateByUrl("event/search")
      } else if (category == "semua" && cityId != null)
        this.router.navigate(['event/search', { id: cityId }]);
      else if (category == null && cityId  != null) {
        this.router.navigate(['event/search', { id: cityId }]);
      }else if(category !=null && cityId  == null){
        this.router.navigate(['event/search', {category:category}])
      }else if(category !=null && cityId  != null){
        this.router.navigate(['event/search', {category:category, id: cityId}])
      }
    }
  }
}
