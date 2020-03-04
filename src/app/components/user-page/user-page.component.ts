import { Component, OnInit, ElementRef } from '@angular/core';
import { City } from 'src/app/models/city';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GraphqHotelService } from 'src/app/services/graphq-hotel.service';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
declare var FB: any;
declare const gapi: any;
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
    private element: ElementRef,
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

  language: string = ""
  languages:string[]

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
    this.languages = [
      "indonesia",
      "english",
      "melayu", 
      "chinese",

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
    this.getUserById(this.user.id);
    
    (window as any).fbAsyncInit = function(){
      FB.init({
        appId:"552493818931035",
        cookie:true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d,s,id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if(d.getElementById(id)){
        return;
      };
      js= d.createElement(s); js.id=id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    this.googleInit();
    
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
  
    if(this.firstName  == '' || this.firstName ==null){
      alert("please insert first name")
      return
    }
    if(this.firstName.length<3){
      alert("plase insert your first name minimal 3(length)")
      return
    }

    if(this.lastName  == "" || this.lastName ==null){
      alert("please insert last name")
      return
    }
    
    if(this.lastName.length<3){
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
      this.city.id, this.postCode, gender, this.language
    ).subscribe(m =>{
      let id = m.data.UpdateUserById
      console.log(id.id)
      console.log(id)
      location.reload()
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
      for(let i=0; i<this.languages.length; i++){
        if(this.user.language.toLowerCase() == this.languages[i].toLowerCase()){
          this.language =  this.languages[i]
        }
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

  
  signInWithFB():void{
    FB.login((response)=>{
      if(response.authResponse){
        ///what to do if success
        console.log(FB.user)
        // FB.
        // FB.signOut();
        FB.api('/me', {fields: 'first_name,last_name, email'},(response)=>{
          // console.log(response.first_name)
          console.log(response);
          console.log(response.email)
          let desc = {
            'firstName': response.first_name,
            'lastName': response.last_name,
            'email' : response.email,
            'password': "",
            'phoneNumber': "",
          }
          let facebookIsLogin= true;
          this.userService.connectUserToFacebook(this.user.id, response.id).subscribe( q=>{
            let temp = q.data.connectUserToFacebook
            if(this.user.id == temp.id){
              alert("success connect to facebook")
            }
          })

          // sessionStorage.setItem("user", JSON.stringify(desc))
          // // console.log(JSON.stringify(facebookIsLogin))
          // sessionStorage.setItem("fb", JSON.stringify(facebookIsLogin));
          
          // location.reload()
        });



      }else{
        //what to do if fail
      }
      
    },{
      scope: "email",
      
    })
  }

  
  logOutWithFB():void{
    FB.logout(()=>{
         
    }
    )
  }


  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');


  private clientId:string = "928387927303-m0ecfie9ug0dflt54b046qc887fmu9r4.apps.googleusercontent.com"

  
  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookie_policy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.querySelector("#googleBtn"));
    });
    
  } 
  
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
        // let desc = {
        //   'firstName': profile.getGivenName(),
        //   'lastName': profile.getFamilyName(),
        //   'email' : profile.getEmail(),
        //   'password': "",
        //   'phoneNumber': "",
        // }
        let userId 
        let urlGoogle = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + googleUser['uc']["access_token"]
        that.http.get(urlGoogle).subscribe(user => {

          userId = user["user_id"]
          that.userService.connectUserToGoogle(that.user.id, userId).subscribe(q=>{
            let temp = q.data.connectUserToGoogle
            if(that.user.id == temp.id){
              alert("success connecto google")
            }
          })
        })


        // console.log(desc["email"])
        // sessionStorage.setItem("user", JSON.stringify(desc))
        // location.reload()



      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
}
