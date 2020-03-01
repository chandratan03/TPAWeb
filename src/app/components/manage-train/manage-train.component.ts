import { Component, OnInit } from '@angular/core';
import { GraphqTrainService } from 'src/app/services/graphq-train.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TrainTrip } from 'src/app/models/train-trip';
import { Station } from 'src/app/models/station';
import { TrainType } from 'src/app/models/train-type';
import { NumberFormatStyle } from '@angular/common';
import { truncateSync } from 'fs';
import { Train } from 'src/app/models/train';
import { timingSafeEqual } from 'crypto';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-manage-train',
  templateUrl: './manage-train.component.html',
  styleUrls: ['./manage-train.component.scss']
})
export class ManageTrainComponent implements OnInit {

  constructor(private service: GraphqTrainService,
    private router: Router,
    private chatService: ChatServiceService,
    private userService: GraphqpUserService,

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
  backDateStr: string
  backDate: Date
  manyPassenger: number


  trainTypes: TrainType[]
  trainCheckbox: boolean[]
  trainCheckbox2: boolean[]
  trainToSearch = {}
  pulang: boolean





  //
  user:User
  user$:Subscription
  ngOnInit() {

    this.getUser()

    this.trainTripId = -1
    this.getStations()
    this.getTrainTrips()
    this.getTrainsForForm()
    this.setModal()
    this.classCheckbox = Array(3)
    this.classCheckbox2 = Array(3)
    for (let i = 0; i < this.classCheckbox.length; i++) {
      this.classCheckbox[i] = false
    }
    this.timeCheckbox = Array(4)
    this.timeCheckbox2 = Array(4)
    this.times = Array(4)
    for (let i = 0; i < this.timeCheckbox.length; i++) {
      this.timeCheckbox[i] = false
      this.times[i] = 6 * i
    }
    let modal = document.getElementById("modal")
  
    this.chatService.listen('waitForNewTrain').subscribe(msg => {
      alert("NEW EVENT IS COMINGG RELOAD TO SEE THAT")
      console.log('test')
    })
    setTimeout(()=>{
      document.getElementById("loading-page").style.display="none"
    },2000)


  }   
  
 emitNewEvent(): void {
  this.chatService.emit("waitForNewTrain", "hehe")
}
  getUser(): void {
    if (sessionStorage.getItem("user") == null) {
      alert("you must be a admin or login first")
      this.router.navigateByUrl('')
    }
    let temp = JSON.parse(sessionStorage.getItem("user"))
    if (temp.isAdmin == false) {
      alert("you must be a admin or login first")
      this.router.navigateByUrl('')

    }
    this.user$ = this.userService.getUserById(temp.id).subscribe(
      q => {
        this.user = q.data.userById
        if (this.user.id != 0) {
         // DO SOMETHING HERE

        }
        else {
          alert("not valid user")
          this.router.navigateByUrl('')
        }
      }
    )
  }

  from:number = 0;
  trainPage:number =0 ;



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.trainTrips$.unsubscribe()
    this.trainTrips2$.unsubscribe()
    this.stations$.unsubscribe()
  }

  getStations(): void {
    this.stations$ = this.service.getStations().subscribe(query => {
      this.stations = query.data.stations
      // console.log(query.data)
    })
  }

  reset(): void {
    for (let i = 0; i < this.trainCheckbox.length; i++) {
      this.trainCheckbox[i] = false;
      this.trainCheckbox2[i] = false
    }
    for (let i = 0; i < this.timeCheckbox.length; i++) {
      this.timeCheckbox[i] = false
      this.timeCheckbox2[i] = false;
    }
    for (let i = 0; i < this.classCheckbox.length; i++) {
      this.classCheckbox[i] = false;
      this.classCheckbox2[i] = false;
    }
    this.validateAllFilter()

  }
  getTrains(): void {
    this.trainTypes = []
    // console.log(this.trainTripsFIX)
    for (let i = 0; i < this.trainTripsFIX.length; i++) {
      let flag = 0;
      // console.log(this.trainTypes.length)
      // console.log(this.trainTypes)
      for (let j = 0; j < this.trainTypes.length; j++) {
        //  console.log("j :" + j) 
        if (this.trainTypes[j].id == this.trainTripsFIX[i].train.trainType.id) {
          // console.log(this.trainTypes[j])
          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        this.trainTypes.push(this.trainTripsFIX[i].train.trainType)
      }
    }
    // console.log(this.trainTypes)
    this.trainCheckbox = []
    this.trainCheckbox2 = []
    for (let i = 0; i < this.trainTypes.length; i++) {
      this.trainCheckbox.push(false);
      this.trainCheckbox2.push(false);
    }
  }

  markTrain(i: number) {
    this.trainCheckbox[i] = !this.trainCheckbox[i]
    this.validateAllFilter()
  }

  getTrainTrips(): void {
    this.trainTrips$ = this.service.getTrainTrips().subscribe(query => {
      this.trainTrips = []
      // console.log(query.data.trainTripsFromToDate)
      this.trainTrips = query.data.trainTrips
      for (let i = 0; i < this.trainTrips.length; i++) {
        let depHours, depMinutes, arrHours, arrMinutes
        depHours = new Date(this.trainTrips[i].departure).getHours()
        depMinutes = new Date(this.trainTrips[i].departure).getMinutes()
        this.trainTrips[i].timeDeparture = {
          hours: depHours,
          minutes: depMinutes,
        }
        arrHours = new Date(this.trainTrips[i].arrival).getHours()
        arrMinutes = new Date(this.trainTrips[i].arrival).getMinutes()
        this.trainTrips[i].timeArrival = {
          hours: arrHours,
          minutes: arrMinutes,
        }
      }
      this.trainTripsFIX = this.trainTrips2 = this.trainTrips
      this.initDetailTrain()
      this.trainPage = Math.ceil(this.trainTrips.length/10)

      this.getTrains()
      this.from = 0;
      this.trainTrips = []  
      this.setData()

    })
  }

  initDetailTrain(): void {
    this.detailTrainTrip = Array(this.trainTrips.length)
    this.detailTrainTrip2 = Array(this.trainTrips.length)
    this.detailTrainPrice = Array(this.trainTrips.length)
    this.detailTrainPrice2 = Array(this.trainTrips.length)
    for (let i = 0; i < this.trainTrips.length; i++) {
      this.detailTrainPrice2[i] = this.detailTrainPrice[i] = this.detailTrainTrip[i] = this.detailTrainTrip2[i] = false;
    }
  }
  showDetailPrice(i: number) {
    this.detailTrainPrice2[i] = !this.detailTrainPrice2[i]
  }
  showDetailTrip(i: number) {
    // console.log(i)
    this.detailTrainTrip2[i] = !this.detailTrainTrip2[i]
  }



  validateAllFilter(): void {
    this.trainTrips = []
    this.validateAllClassChecked()
    this.validateAllTime()
    this.validateTrains()
    this.trainTrips2 = this.trainTrips
    this.trainTrips = []
    this.from = 0;
    this.setData()
  }
  classCheckbox: boolean[]
  classCheckbox2: boolean[]

  //Class
  markClass(i: number): void {
    this.classCheckbox[i] = !this.classCheckbox[i]
    this.validateAllFilter()
  }
  validateAllClassChecked(): void {
    let flag = 0;
    for (let i = 0; i < 3; i++) {
      if (this.classCheckbox[i] == true) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      this.trainTrips = this.trainTripsFIX
      return;
    } else {
      for (let i = 0; i < 3; i++) {
        if (this.classCheckbox[i] == true) {
          for (let j = 0; j < this.trainTripsFIX.length; j++) {
            if (this.trainTripsFIX[j].train.trainClass.id == i + 1) {
              this.trainTrips.push(this.trainTripsFIX[j])
            }
          }
        }
      }
    }
  }

  times: number[]
  timeCheckbox: boolean[]
  timeCheckbox2: boolean[]

  markTime(i: number): void {
    this.timeCheckbox[i] = !this.timeCheckbox[i]
    this.validateAllFilter()
  }
  validateAllTime(): void {
    let flag = 0;
    for (let i = 0; i < 4; i++) {
      if (this.timeCheckbox[i] == true) {
        flag = 1;
        break;
      }
    }
    if (flag != 1)
      return
    let trainTripsTemp = this.trainTrips
    this.trainTrips = []
    for (let i = 0; i < 4; i++) {
      if (this.timeCheckbox[i] == true) {
        for (let j = 0; j < trainTripsTemp.length; j++) {
          if (trainTripsTemp[j].timeDeparture.hours >= 6 * i && trainTripsTemp[j].timeDeparture.hours < 6 * (i + 1)) {
            this.trainTrips.push(trainTripsTemp[j])
          }
        }
      }
    }

  }

  validateTrains(): void {
    let flag = 0;
    for (let i = 0; i < this.trainCheckbox.length; i++) {
      if (this.trainCheckbox[i] == true) {
        flag = 1;
        break;
      }
    }
    if (flag == 1) {
      let temp = this.trainTrips
      this.trainTrips = []

      for (let i = 0; i < this.trainCheckbox.length; i++) {
        if (this.trainCheckbox[i] == false) continue

        for (let j = 0; j < temp.length; j++) {
          if (temp[j].train.trainType.id == this.trainTypes[i].id) {
            this.trainTrips.push(temp[j])
          }
        }

      }

    }
  }

  sortAscByDeparture(): void {
    this.trainTrips.sort((a, b) => (a.timeDeparture.hours * 60 + a.timeDeparture.minutes > b.timeDeparture.hours * 60 + b.timeDeparture.minutes ? 1 : -1))
  }
  sortDscByDeparture(): void {
    this.trainTrips.sort((a, b) => (a.timeDeparture.hours * 60 + a.timeDeparture.minutes > b.timeDeparture.hours * 60 + b.timeDeparture.hours ? -1 : 1))
  }
  sortAscByArrival(): void {

    this.trainTrips.sort((a, b) => (a.timeArrival.hours * 60 + a.timeDeparture.hours > b.timeArrival.hours * 60 + b.timeArrival.hours ? 1 : -1))
  }
  sortDscByArrival(): void {
    this.trainTrips.sort((a, b) => (a.timeDeparture.hours * 60 + a.timeDeparture.minutes > b.timeDeparture.hours * 60 + b.timeDeparture.minutes ? -1 : 1))
  }
  sortAscByDuration(): void {

    this.trainTrips.sort((a, b) => (a.duration > b.duration ? 1 : -1))
  }

  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////



  formIsOpen: boolean = false

  openForm() {
    this.formIsOpen = true;

  }

  //FORM model
  //TrainId:       uint(trainId),
  //FromRefer:     uint(fromRefer),
  //ToRefer:       uint(toRefer),
  //Departure:     departureTime,
  //Arrival:       arrivalTime,
  //Duration:      uint(duration),
  //Price:         price,
  //Tax:           tax,
  //ServiceCharge: serviceCharge,


  trainTripId: number

  trainId: number
  trainName: string
  fromRefer: number
  toRefer: number
  departure: Date
  arrival: Date
  duration: number
  price: number
  tax: number
  serviceCharge: number
  departureTime: string
  arrivalTime: string



  popUpDelete: boolean = false

  formTrains: Train[]
  formTrains$: Subscription
  insertTrainTrip$: Subscription
  updateTrainTrip$: Subscription
  deleteTrainTrip$: Subscription
  getTrainsForForm(): void {
    this.formTrains$ = this.service.getTrains().subscribe(query => {
      this.formTrains = query.data.trains
    })
  }



  validateTime(time: string): boolean {
    if (time.length != 5) {
      alert("wrong time format")
      return false
    }
    if (this.countColon(time) != 1) {
      alert("wrong time format")
      return false
    }
    let temp = time.split(":")
    if (isNaN(Number((temp[0])))) {
      alert("wrong time format")
      return false
    }

    if (isNaN(Number(temp[1]))) {
      alert("wrong time format")
      return false
    }
    if (parseInt(temp[0]) > 24 || parseInt(temp[1]) > 60) {
      alert("wrong time")
      return false
    }

    return true
  }

  countColon(time: string): number {
    let colon = 0
    for (let i = 0; i < time.length; i++) {
      if (time[i] == ':') {
        colon++;
      }
    }
    return colon
  }

  insertTrainTrip(): void {

    console.log(this.trainId)
    console.log(this.fromRefer)
    console.log(this.toRefer)
    console.log(this.departure)
    console.log(this.arrival)
    console.log(this.price)
    console.log(this.tax)
    console.log(this.serviceCharge)
    console.log(this.departureTime)
    console.log(this.arrivalTime)


    if (this.trainTripId != -1) {
      alert("you are suppose not to insert, but to update")
      return
    }

    if (this.validateTime(this.departureTime) == false) {
      return
    }
    if (this.validateTime(this.arrivalTime) == false) {
      return
    }
    if (this.trainId == null) {
      alert("please input train")
      return
    }
    if (this.fromRefer == null) {
      alert("please input from")
      return
    }
    if (this.toRefer == null) {
      alert("please input to");
      return
    }


    let depTime = this.departureTime.split(":")
    let arrTime = this.arrivalTime.split(":")
    this.departure.setHours(parseInt(depTime[0]))
    this.departure.setMinutes(parseInt(depTime[1]))

    this.arrival.setHours(parseInt(arrTime[0]))
    this.arrival.setMinutes(parseInt(arrTime[1]))
    if (this.departure.getTime() > this.arrival.getTime()) {
      alert("please input valid date or time")
      return
    }

    var duration = Math.abs(Math.round((this.departure.getTime() - this.arrival.getTime()) / 1000 / 60))//TO MINUTES

    this.insertTrainTrip$ = this.service.insertTrainTrip(
      this.trainId, this.fromRefer, this.toRefer, this.departure.toString(),
      this.arrival.toString(), duration, parseFloat(this.price.toString()),
       parseFloat(this.tax.toString()), parseFloat(this.serviceCharge.toString())).subscribe(mutate => {
         let temp = mutate.data.insertTrainTrip as TrainTrip
         console.log(temp)
         if(temp.id == 0 || temp == null){
           alert("fail")
         }else{
           alert("insert success!!! reload the page")
            this.emitNewEvent()
         }
       })
  }

  updateTrainTrip(): void {
    if (this.trainTripId == -1) {
      alert("you are not selecting a train")
      return
    }
    console.log(this.trainId)
    console.log(this.fromRefer)
    console.log(this.toRefer)
    console.log(this.departure)
    console.log(this.arrival)
    console.log(this.price)
    console.log(this.tax)
    console.log(this.serviceCharge)
    console.log(this.departureTime)
    console.log(this.arrivalTime)

    if (this.trainTripId == null) {
      alert("you are suppose not to insert/ but to update")
      return
    }

    if (this.validateTime(this.departureTime) == false) {
      return
    }
    if (this.validateTime(this.arrivalTime) == false) {
      return
    }
    if (this.trainId == null) {
      alert("please input train")
      return
    }
    if (this.fromRefer == null) {
      alert("please input from")
      return
    }
    if (this.toRefer == null) {
      alert("please input to");
      return
    }


    let depTime = this.departureTime.split(":")
    let arrTime = this.arrivalTime.split(":")
    this.departure.setHours(parseInt(depTime[0]))
    this.departure.setMinutes(parseInt(depTime[1]))

    this.arrival.setHours(parseInt(arrTime[0]))
    this.arrival.setMinutes(parseInt(arrTime[1]))
    if (this.departure.getTime() > this.arrival.getTime()) {
      alert("please input valid date or time")
      return
    }

    var duration = Math.abs(Math.round((this.departure.getTime() - this.arrival.getTime()) / 1000 / 60))//TO MINUTES

    this.insertTrainTrip$ = this.service.updateTrainTrip(this.trainTripId,
      this.trainId, this.fromRefer, this.toRefer, this.departure.toString(),
      this.arrival.toString(), duration, parseFloat(this.price.toString()), parseFloat(this.tax.toString()), parseFloat(this.serviceCharge.toString())).subscribe()
      this.emitNewEvent()
      alert("insert success!!! reload the page")
  }

  closePopUp() {
    console.log("helo")
    this.popUpDelete = false
  }

  openPopUp(hehe: number) {
    this.trainTripId = hehe
    this.popUpDelete = true
    console.log(this.trainTripId)
  }

  sureDelete() {
    // console.log(this.id)
    this.deleteTrainTrip$ = this.service.deleteTrainTripById(this.trainTripId).subscribe()
    console.log("deleted", this.trainTripId)
    this.popUpDelete = false
  }
  update(): void {

  }

  setModal(): void {

    let modal = document.getElementById("modal")
    let btn = document.getElementById("showForm")
    btn.onclick = () => {
      // console.log(this.trainId)
      // console.log(this.fromRefer)
      // console.log(this.toRefer)
      // console.log(this.departure)
      // console.log(this.arrival)
      // console.log(this.price)
      // console.log(this.tax)
      // console.log(this.serviceCharge)
      // console.log(this.departureTime)
      // console.log(this.arrivalTime)
      this.trainTripId = -1
      this.trainId = null
      this.fromRefer = null
      this.toRefer = 0
      this.departure = null
      this.arrival = null
      this.departure = null
      this.departureTime = null
      this.arrival = null
      this.arrivalTime = null

      this.price = 0
      this.tax = 0
      this.serviceCharge = 0
      modal.style.display = "flex"
    }
    window.onclick = (event) => {
      if (event.target == modal) {

        modal.style.display = "none"
      }
    }
  }


  showUpdateForm(i: number): void {
    this.trainTripId = this.trainTrips[i].id
    this.trainId = this.trainTrips[i].train.id
    this.fromRefer = this.trainTrips[i].from.id
    this.toRefer = this.trainTrips[i].to.id
    this.departure = new Date(this.trainTrips[i].departure)
    this.arrival = new Date(this.trainTrips[i].arrival)
    this.price = this.trainTrips[i].price
    this.tax = this.trainTrips[i].tax
    this.serviceCharge = this.trainTrips[i].serviceChange
    console.log(this.departure)
    console.log(this.arrival)
    let depHour = this.departure.getHours() < 10 ? "0" + this.departure.getHours() : this.departure.getHours()
    let depMinutes = this.departure.getMinutes() < 10 ? "0" + this.departure.getMinutes() : this.departure.getHours()


    let arrHour = this.arrival.getHours() < 10 ? "0" + this.arrival.getHours() : this.arrival.getHours()
    let arrMinutes = this.arrival.getMinutes() < 10 ? "0" + this.arrival.getMinutes() : this.arrival.getHours()

    this.departureTime = depHour + ':' + depMinutes
    this.arrivalTime = arrHour + ":" + arrMinutes

    let modal = document.getElementById("modal")
    modal.style.display = "flex"

  }
  
  setData():void{
    this.trainTrips  = this.trainTrips2.slice(this.from*10, (this.from*10)+10)  
  }

  prevTrainPage():void{
    if(this.from == 0){
      return
    }
    this.from--
    this.setData();
  }
  nextTrainPage():void{
    if(this.from == this.trainPage -1){
      return
    }
    this.from++
    this.setData()
  }
  setTrainPage(i: number):void{
    this.from = i
    this.setData();
  }


}
