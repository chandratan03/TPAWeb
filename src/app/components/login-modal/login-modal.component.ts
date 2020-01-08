import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { SocialLoginService } from 'src/app/services/social-login.service';
import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import { ActivatedRoute } from '@angular/router';
// import { EventEmitter } from 'protractor';
import {GraphqpUserService} from "../../services/graphqp-user.service"
import { User } from "../../models/user"
import { Subscription } from 'rxjs';
declare var FB: any;


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Output() nextPage = new EventEmitter()
  
  emailOrPhonenumber:string;

  user$: Subscription
  user: User;


  
  constructor(
    private service: SocialLoginService,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private route: ActivatedRoute,
    private userService: GraphqpUserService
  ){
    this.gapiService.onLoad().subscribe();
  }
  
  
  ngOnInit() {
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
  

  // GOOGLE
  onSignIn():void {
    this.service.signIn( )
  }
  

  //FACEBOOk
  signInWithFB():void{
    FB.login((response)=>{
      if(response.authResponse){
        ///what to do if success
        console.log(FB.user)
        // FB.
        // FB.signOut();
      }else{
        //what to do if fail
      }
      
    })
  }

  logOutWithFB():void{
    FB.logout(()=>{
         
    }
    )
  }

   goToNextPage():void{
     this.user$ =   this.userService.getUserByEmail(this.emailOrPhonenumber).subscribe(query =>{
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


}
