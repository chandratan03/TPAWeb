import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainTrip } from 'src/app/models/train-trip';
import { GraphqTrainService } from 'src/app/services/graphq-train.service';
import { Train } from 'src/app/models/train';
import { Station } from 'src/app/models/station';
import { Router } from '@angular/router';
import { TrainType } from 'src/app/models/train-type';

@Component({
  selector: 'app-train-search-page',
  templateUrl: './train-search-page.component.html',
  styleUrls: ['./train-search-page.component.scss']
})
export class TrainSearchPageComponent implements OnInit {

  constructor(private service: GraphqTrainService,
    private router: Router 
    ) { }

  trainTrips$: Subscription
  trainTrips2$: Subscription
  trainTrips: TrainTrip[]
  trainTrips2: TrainTrip[]
  
  stations: Station[]
  stations$: Subscription

  trainTripsFIX: TrainTrip[]

  detailTrainTrip: boolean[]
  detailTrainTrip2: boolean[]
  
  detailTrainPrice: boolean[]
  detailTrainPrice2: boolean[]

  selectedFromId: number
  selectedToId: number
  fromDate: Date
  fromDateStr: string
  backDateStr:string
  backDate: Date
  manyPassenger: number


  trainTypes: TrainType[]
  trainCheckbox: boolean[]
  trainCheckbox2: boolean[]
  trainToSearch={}
  pulang: boolean

  ngOnInit() {
    let json = JSON.parse(sessionStorage.getItem("trainQuery"))
    this.selectedFromId = json["fromId"]
    this.selectedToId = json["toId"]
    this.fromDateStr = json["fromDate"]
    this.backDateStr = json["backDate"]
    this.fromDate = new Date(json["fromDate"])
    if(this.backDateStr!=null){
      this.backDate = new Date(json["backDate"])
      this.pulang = true

    }
    this.manyPassenger = json["manyPassenger"]
    console.log(this.backDateStr)
    this.getStations()
    this.getTrainTrips()

    this.classCheckbox = Array(3)
    this.classCheckbox2 = Array(3)
    for(let i=0; i<this.classCheckbox.length; i++){
      this.classCheckbox[i] = false
    }
    this.timeCheckbox = Array(4)
    this.timeCheckbox2 = Array(4)
    this.times= Array(4)
    for(let i=0; i<this.timeCheckbox.length; i++){
      this.timeCheckbox[i] = false
      this.times[i] = 6*i
    }
  }

 

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.trainTrips$.unsubscribe()
    this.trainTrips2$.unsubscribe()
    this.stations$.unsubscribe()
  }

  getStations():void{
    this.stations$ = this.service.getStations().subscribe(query=>{
      this.stations = query.data.stations
      // console.log(query.data)
    })
  }

  reset():void{
    for(let i=0; i<this.trainCheckbox.length; i++){
      this.trainCheckbox[i] = false;
      this.trainCheckbox2[i]= false
    }
    for(let i=0; i<this.timeCheckbox.length; i++){
      this.timeCheckbox[i] = false
      this.timeCheckbox2[i] = false;
    }
    for(let i=0; i<this.classCheckbox.length; i++){
      this.classCheckbox[i] = false;
      this.classCheckbox2[i] =false;
    }
    this.validateAllFilter()

  }
  getTrains():void{
    this.trainTypes = []
    for(let i=0; i<this.trainTripsFIX.length; i++){
      let flag=0;
      for(let j=0; j<this.trainTypes.length; j++){
        if(this.trainTypes[j].id == this.trainTripsFIX[i].train.trainType.id){
          flag=1;
          break;
        }
      }
      if(flag==0){
        this.trainTypes.push(this.trainTripsFIX[i].train.trainType)
      }
    }
    console.log(this.trainTypes)
    this.trainCheckbox = []
    this.trainCheckbox2 = []
    for(let i=0; i<this.trainTypes.length; i++){
      this.trainCheckbox.push(false);
      this.trainCheckbox2.push(false);
    }
  }

  markTrain(i:number){
    this.trainCheckbox[i] = !this.trainCheckbox[i]
    this.validateAllFilter()
  }

  getTrainTrips():void{
    this.trainTrips$ = this.service.getTrainTripsByFromToDate(this.selectedFromId, this.selectedToId, this.fromDateStr).subscribe(query => {
      this.trainTrips=[]
      // console.log(query.data.trainTripsFromToDate)
      if(this.backDate !=null ){
        // console.log(this.backDate)
        this.trainTrips2$ = this.service.getTrainTripsByFromToDate(this.selectedFromId, this.selectedToId, this.backDateStr).subscribe(query2 => {
           
          let temp = query2.data.trainTripsFromToDate as TrainTrip[]
          
          this.trainTrips.push(... query.data.trainTripsFromToDate)
          this.initDetailTrain()

          for(let i=0; i<this.trainTrips.length; i++){
            let depHours, depMinutes, arrHours, arrMinutes
            depHours = new Date(this.trainTrips[i].departure).getHours()
            depMinutes = new Date(this.trainTrips[i].departure).getMinutes()
            this.trainTrips[i].timeDeparture ={
              hours:depHours,
              minutes: depMinutes,
            }
            arrHours = new Date(this.trainTrips[i].arrival).getHours()
            arrMinutes = new Date(this.trainTrips[i].arrival).getMinutes()
            this.trainTrips[i].timeArrival ={
              hours:arrHours,
              minutes: arrMinutes,
            }
          }
          this.trainTripsFIX = this.trainTrips2= this.trainTrips
          this.getTrains()
        })
      }else{
        this.trainTrips = query.data.trainTripsFromToDate
        for(let i=0; i<this.trainTrips.length; i++){
          let depHours, depMinutes, arrHours, arrMinutes
          depHours = new Date(this.trainTrips[i].departure).getHours()
          depMinutes = new Date(this.trainTrips[i].departure).getMinutes()
          this.trainTrips[i].timeDeparture ={
            hours:depHours,
            minutes: depMinutes,
          }
          arrHours = new Date(this.trainTrips[i].arrival).getHours()
          arrMinutes = new Date(this.trainTrips[i].arrival).getMinutes()
          this.trainTrips[i].timeArrival ={
            hours:arrHours,
            minutes: arrMinutes,
          }
        }
        this.trainTripsFIX = this.trainTrips2= this.trainTrips
       this.initDetailTrain()
       this.getTrains()
      }
    })
  }

  initDetailTrain():void{
    this.detailTrainTrip = Array(this.trainTrips.length)
    this.detailTrainTrip2 = Array(this.trainTrips.length)
    this.detailTrainPrice = Array(this.trainTrips.length)
    this.detailTrainPrice2 = Array(this.trainTrips.length)
    for(let i=0; i<this.trainTrips.length; i++){
      this.detailTrainPrice2[i]=this.detailTrainPrice[i]=this.detailTrainTrip[i] = this.detailTrainTrip2[i] = false;
    }
  }
  showDetailPrice(i:number){
    this.detailTrainPrice2[i] = !this.detailTrainPrice2[i]
  }
  showDetailTrip(i:number){
    // console.log(i)
    this.detailTrainTrip2[i] = !this.detailTrainTrip2[i]
  }


  
  validateAllFilter():void{
    this.trainTrips=[]
    this.validateAllClassChecked()
    this.validateAllTime()
    this.validateTrains()

  }
  classCheckbox: boolean[]
  classCheckbox2: boolean[]
  
  //Class
  markClass(i: number):void{
    this.classCheckbox[i] = !this.classCheckbox[i]
    this.validateAllFilter() 
  }
  validateAllClassChecked():void{
    let flag=0;
    for(let i=0; i<3; i++){
      if(this.classCheckbox[i] == true){
        flag=1;
        break;
      }
    }
    if(flag==0){
      this.trainTrips = this.trainTripsFIX
      return;
    }else{
      for(let i=0; i<3; i++){
        if(this.classCheckbox[i] == true){
          for(let j=0; j<this.trainTripsFIX.length;j++){
            if(this.trainTripsFIX[j].train.trainClass.id == i+1){
              this.trainTrips.push(this.trainTripsFIX[j])
            }
          }
        }
      }
    }
  }
  
  times:number[]
  timeCheckbox:boolean[]
  timeCheckbox2:boolean[]

  markTime(i: number):void{
    this.timeCheckbox[i] = !this.timeCheckbox[i]
    this.validateAllFilter() 
  }
  validateAllTime():void{
    let flag=0;
    for(let i=0; i<4; i++){
      if(this.timeCheckbox[i] == true){
        flag=1;
        break;
      }
    }
    if(flag!=1)
      return
    let trainTripsTemp = this.trainTrips
    this.trainTrips=[]
    for(let i=0; i<4; i++){
      if(this.timeCheckbox[i] == true){
        for(let j=0; j<trainTripsTemp.length; j++){
          if(trainTripsTemp[j].timeDeparture.hours>=6*i && trainTripsTemp[j].timeDeparture.hours < 6*(i+1)){
            this.trainTrips.push(trainTripsTemp[j])
          }
        }
      }
    }

  }

  validateTrains():void{
    let flag=0;
    for(let i=0; i<this.trainCheckbox.length; i++){
      if(this.trainCheckbox[i]==true){
        flag=1;
        break;
      }
    }
    if(flag==1){
      let temp = this.trainTrips
      this.trainTrips= []

      for(let i=0; i<this.trainCheckbox.length; i++){
        if(this.trainCheckbox[i] ==false)continue

        for(let j=0; j<temp.length; j++){
          if(temp[j].train.trainType.id == this.trainTypes[i].id){
            this.trainTrips.push(temp[j])
          }
      }

      }

    }
  }

  sortAscByDeparture():void{
    this.trainTrips.sort((a,b) => (a.timeDeparture.hours * 60 + a.timeDeparture.minutes>b.timeDeparture.hours*60 + b.timeDeparture.minutes ? 1: -1))
  }
  sortDscByDeparture():void{
    this.trainTrips.sort((a,b) => (a.timeDeparture.hours * 60 + a.timeDeparture.minutes>b.timeDeparture.hours*60 + b.timeDeparture.hours ? -1: 1))
  }
  sortAscByArrival():void{

    this.trainTrips.sort((a,b) => (a.timeArrival.hours * 60 + a.timeDeparture.hours>b.timeArrival.hours*60 + b.timeArrival.hours ? 1: -1))
  }
  sortDscByArrival():void{
    this.trainTrips.sort((a,b) => (a.timeDeparture.hours * 60 + a.timeDeparture.minutes>b.timeDeparture.hours*60 + b.timeDeparture.minutes ? -1: 1))
  }
  sortAscByDuration():void{
    
    this.trainTrips.sort((a,b) => (a.duration>b.duration ? 1: -1))
  }
  


}
