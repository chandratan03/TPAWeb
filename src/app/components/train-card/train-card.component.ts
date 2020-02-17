import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station';
import { Subscription } from 'rxjs';
import { GraphqTrainService } from 'src/app/services/graphq-train.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-card',
  templateUrl: './train-card.component.html',
  styleUrls: ['./train-card.component.scss']
})
export class TrainCardComponent implements OnInit {

  pulang:boolean;


  fromDate:Date;
  backDate:Date;

  selectedFromId: string
  selectedToId:string
  manyPassenger: number

  trainToSearch = {}


  stations: Station[]
  stations$: Subscription

  constructor(private service: GraphqTrainService,
      private router: Router
    ) { }

  ngOnInit() {
    this.pulang = false
    this.getStations()
    sessionStorage.removeItem("trainQuery")
  }

  getStations():void{
    this.stations$ = this.service.getStations().subscribe(query=>{
      this.stations = query.data.stations
      console.log(this.stations)
    })
  }

  
  trainSearchPage():void{
    if(this.selectedFromId == null){
      alert("input where to depart")
      return
    }
    if(this.selectedToId == null){
      alert("input where to arrive")
      return
    }

    if(this.selectedToId == this.selectedFromId){
      alert("please don't select same station")
      return
    }

    if(this.fromDate == null){
      alert("Input from date")
      return
    }
    if(this.pulang==true && this.backDate == null){
      alert("Input back date")
      return
    }
    if(this.manyPassenger <=0 || this.manyPassenger > 7){
      alert("please insert quantity")
      return
    }
   
    console.log(this.fromDate.getDate())
    let day, month, year, fromDate, backDate=null

    day = this.fromDate.getDate()
    // console.log(this.fromDate)
    month = this.fromDate.getMonth()+1
    year = this.fromDate.getFullYear()
    if(day < 10){
      day = "0"+day
    }
    if(month<10){
      month = "0"+month
    }
    console.log(month)
    fromDate = month+"/"+day+"/"+year

    if(this.backDate !=null){
      day = this.backDate.getDate()
      month = this.backDate.getMonth()+1
      year = this.backDate.getFullYear()
      if(day < 10){
        day = "0"+day
      }
      if(month<10){
        month = "0"+month
      }
      backDate = month+"/"+day+"/"+year
    }
    this.trainToSearch = {
      "fromId": this.selectedFromId,
      "toId": this.selectedToId,
      "fromDate": fromDate,
      "backDate": backDate,
      "manyPassenger": this.manyPassenger,
    }
    // this.flightToSearch[]
    sessionStorage.setItem("trainQuery", JSON.stringify(this.trainToSearch))
    this.router.navigateByUrl("/train/search")
  }

}
