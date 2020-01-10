import { Component, OnInit, Output, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
declare const gapi: any;
declare const FB: any;
@Component({
  selector: 'app-login-modal2',
  templateUrl: './login-modal2.component.html',
  styleUrls: ['./login-modal2.component.scss']
})
export class LoginModal2Component implements OnInit {


  private clientId:string = "928387927303-m0ecfie9ug0dflt54b046qc887fmu9r4.apps.googleusercontent.com"

  constructor(
    private userService: GraphqpUserService,
    private element: ElementRef
  ) { }
  user: User
  user$: Subscription;
  hasUser: boolean;

  email: string;
  password: string;
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user == null || this.user.email == ""){
      this.hasUser=false;
      
    }else{
      this.hasUser = true
    }

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

  login(): void{
    this.user$ = this.userService.getUserByEmailAndPassword(this.email, this.password).subscribe(query =>{
      this.user = query.data.userByEmailAndPassword as User
      // if(this.user!=null){
        if(this.user.email !=""){
          sessionStorage.setItem("user", JSON.stringify(this.user));
          
          location.reload()
        }
        console.log(this.user);
      // }
    })
  }


  //FACEBOOK
    



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
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        



      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }


  
}
