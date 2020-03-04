import { Component, OnInit, Output,EventEmitter, ElementRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
// import { EventEmitter } from 'protractor';
import {GraphqpUserService} from "../../services/graphqp-user.service"
import { User } from "../../models/user"
import { Subscription } from 'rxjs';
declare var FB: any;
declare const gapi: any;
 

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Output() nextPage = new EventEmitter()
  
  emailOrPhonenumber:string = "";

  user$: Subscription
  user: User;
  private clientId:string = "928387927303-m0ecfie9ug0dflt54b046qc887fmu9r4.apps.googleusercontent.com"

  
  constructor(

    private route: ActivatedRoute,
    private element: ElementRef,
    private userServiceGraph: GraphqpUserService,
  ){
    // this.user = new User()

    
  }

  googleButton:HTMLElement = document.getElementById('googleBtn')
  ngOnInit() {
    // this.user = {
    //   id:0,
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   phoneNumber:"",
    //   gender:"",
    //   nationality:""
    // }

    this.route.fragment.subscribe((fragment) => {
      console.log(fragment)
    });


    //FACEBOOK
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
  } 
  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.user$.unsubscribe();
  }

  //FACEBOOk
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
          sessionStorage.setItem("user", JSON.stringify(desc))
          // console.log(JSON.stringify(facebookIsLogin))
          sessionStorage.setItem("fb", JSON.stringify(facebookIsLogin));
          
          location.reload()
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

   goToNextPage():void{
     if(this.emailOrPhonenumber == ""){
       alert("Please insert the field")
       return
     }
     this.user$ =   this.userServiceGraph.getUserByEmail(this.emailOrPhonenumber).subscribe(query =>{
        this.user = query.data.userByEmail as User
        console.log(typeof(query.data.userByEmail))
        console.log(this.user.firstName)
        // test = JSON.parse(query.data.userByEmail);
        console.log(this.user)
        if(this.user.email!= ""){
            document.getElementById("loginModal2").style.display = "block"
          }else{
            document.getElementById("registerModal").style.display = "block"
          }
          document.getElementById("loginModal1").style.display = "None"
      }        
    );
    // console.log(user.email)
    // console.log(this.user.email)
    // console.log(this.user)
  }



  //GOOGLE
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

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
        let desc = {
          'firstName': profile.getGivenName(),
          'lastName': profile.getFamilyName(),
          'email' : profile.getEmail(),
          'password': "",
          'phoneNumber': "",
        }

        console.log(desc["email"])
        sessionStorage.setItem("user", JSON.stringify(desc))
        location.reload()



      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
