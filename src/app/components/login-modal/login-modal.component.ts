import { Component, OnInit } from '@angular/core';
import { SocialLoginService } from 'src/app/services/social-login.service';
import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import { ActivatedRoute } from '@angular/router';


declare var FB: any;


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  
  constructor(
    private service: SocialLoginService,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private route: ActivatedRoute,
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

}
