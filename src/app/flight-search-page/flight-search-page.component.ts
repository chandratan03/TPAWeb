import { Component, OnInit } from '@angular/core';
import { GraphqpUserService } from '../services/graphqp-user.service';
import { Flight } from '../models/flight';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-search-page',
  templateUrl: './flight-search-page.component.html',
  styleUrls: ['./flight-search-page.component.scss']
})
export class FlightSearchPageComponent implements OnInit {

  flights$: Subscription
  flights: Flight[]
  AllFlights: Flight[]
  constructor(
    private myService: GraphqpUserService,

  ) { }

  ngOnInit() {
    this.getFlights()
    this.flights = Array(0)
    document.onscroll = function(){
      if(window.scrollY + window.innerHeight + window.innerHeight*20/100 >= document.body.scrollHeight){
        
        this.setData()
      }
    }.bind(this)
  }

  from:number = 0;

  setData():void{
    if(this.from >= this.AllFlights.length){
      return
    }
    let temp = this.AllFlights.slice(this.from, this.from+5)
    console.log(temp)
    this.flights.push(... temp)
    this.from+=5
  }

  changeTimeFormat(word: number): string{
    if(word <= 10){
      var temp = "0"+word
    }else{
      var temp = word.toString()
    }
    return temp

  }
  getFlights(): void {
    this.flights$ = this.myService.getFlights().subscribe(query => {
      this.AllFlights = query.data.flights as Flight[]

      for(let i=0; i<this.AllFlights.length; i++){
        let depMinTemp = new Date(this.AllFlights[i].departure).getUTCHours()
        let depMin = this.changeTimeFormat(depMinTemp)
        let depSecTemp = new Date(this.AllFlights[i].departure).getUTCMinutes()
        let depSec = this.changeTimeFormat(depSecTemp)
        let arrMinTemp = new Date(this.AllFlights[i].arrival).getUTCHours()
        let arrMin = this.changeTimeFormat(arrMinTemp)
        let arrSecTemp =  new Date(this.AllFlights[i].arrival).getUTCMinutes()
        let arrSec = this.changeTimeFormat(arrSecTemp)

        let dep = depMin+ ":"+depSec
        let arr = arrMin+ ":"+arrSec
        
        // dep = Min
        this.AllFlights[i].departure =  dep
        this.AllFlights[i].arrival = arr
        let countRoute=this.AllFlights[i].routes.length
        this.AllFlights[i].transit = countRoute
        if(countRoute == 0){
          this.AllFlights[i].sTransit = "langsung"
        }else{
          this.AllFlights[i].sTransit = countRoute+" transits"
        }
      }

      console.log(this.AllFlights)
      this.setData()
    }
    )
  }



}
