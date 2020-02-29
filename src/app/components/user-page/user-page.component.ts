import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(
    private router: Router,
    private hotelService: GraphqHotelService,
    private userService: GraphqpUserService,
    private http: HttpClient,
  ) { }

  title: string = ""
  firstName:string=""
  lastName:string=""
  city:City=null
  address: string=""
  postCode:string=""
  user: User
  user$: Subscription
  titles:string[]


  email:string
  phoneNumber:string

  cities: City[]
  cities$: Subscription



  ngOnInit() {
    if(sessionStorage.getItem("user") == null){
      this.router.navigateByUrl("/");
    }
    this.titles = [
      'mr',
      'mrs',
    ]


    this.user = JSON.parse(sessionStorage.getItem("user")) 
    // this.city = this.user.city
    // console.log(this.user)
    // this.firstName = this.user.firstName
    // this.lastName = this.user.lastName
    // this.address = this.user.address
    // this.postCode = this.user.postCode


    // if(this.user.gender == "male"){
    //   this.title = this.titles[0]
    // }else{
    //   this.title = this.titles[1]
    // }
    this.getUserById(this.user.id)
    
    
  }
  getCities():void{
    this.cities$ = this.hotelService.getCities().subscribe(q=>{
      this.cities =  q.data.cities
      console.log(this.cities)
      for(let i=0; i<this.cities.length; i++){
        if(this.cities[i].id == this.user.city.id){
          this.city=  this.cities[i]
          break;
        }
      }
    })
  }

  doSaveUser():void{
    if(this.title == "" || this.title == null){
      alert("please select your title")
      return
    } 
  
    if(this.firstName  == "" || this.firstName ==null){
      alert("please insert first name")
      return
    }
    if(this.firstName.length<5){
      alert("plase insert your first name minimal 5(length)")
      return
    }

    if(this.lastName  == "" || this.lastName ==null){
      alert("please insert last name")
      return
    }
    
    if(this.lastName.length<5){
      alert("plase insert your last name minimal 5(length)")
      return
    }

    if(this.city == null){
      alert("please select your city")
      return
    }

    if(this.address == null){
      alert("please insert your address")
      return
    }
    
    if(this.address.length < 7){
      alert("please insert your address minimal 7 length")
      return
    }

    if(this.postCode.length < 5 || this.postCode == null){
      alert("please input post code")
      return
    }
    
    this.updateUserData()
  }

  updateUserData():void{
    let gender;
    if(this.title == "mr"){
      gender="male"
    }else{
      gender = "female"
    }
    this.user.phoneNumber = this.phoneNumber
    this.user.email= this.email
    this.user$ = this.userService.updateUserById(
      this.user.id,this.firstName,this.lastName,
      this.user.email, this.user.phoneNumber, 
      this.user.nationality, this.address,
      this.city.id, this.postCode, gender
    ).subscribe(m =>{
      let id = m.data.UpdateUserById
      console.log(id.id)
      console.log(id)
      this.getUserById(id.id)
    })
    
  }
  getUserById(id:number):void{
    this.user$ = this.userService.getUserById(id).subscribe(q=>{
      this.user = q.data.userById[0]
      console.log(q.data)
      this.city = this.user.city
      console.log(this.user)
      this.firstName = this.user.firstName
      this.lastName = this.user.lastName
      this.address = this.user.address
      this.postCode = this.user.postCode
      this.email = this.user.email
      this.phoneNumber = this.user.phoneNumber
      
      if(this.user.gender == "male"){
        this.title = this.titles[0]
      }else{
        this.title = this.titles[1]
      }
      this.getCities()
      // location.reload()
    })
  }  

  PHONE_ACCESS_KEY = "328f40abc5f4e0c89f36da12d5db5ee3"
  verifyPhone():void{
    this.http.get("http://apilayer.net/api/validate?access_key="+this.PHONE_ACCESS_KEY+"& number="+this.phoneNumber+"3&country_code=&format=1").subscribe(j=>{
      console.log(j["valid"])   
      if(j["valid"] == true){
        this.user$ = this.userService.updatePhoneVerified(this.user.id).subscribe(q=>{
          location.reload()
        })
      }
    })
  }

  

}
