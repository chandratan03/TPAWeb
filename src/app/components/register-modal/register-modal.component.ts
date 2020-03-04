import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup } from '@angular/forms';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Subscription } from 'rxjs';
import { PhoneCodes, PhoneCode } from './phone-code';
import { HttpClient } from '@angular/common/http';
declare var FB: any;
declare const gapi: any;

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  private clientId: string = "928387927303-m0ecfie9ug0dflt54b046qc887fmu9r4.apps.googleusercontent.com"

  private urlGoogle = "https://www.googleapis.com/plus/v1/people/me?access_token="


  selectedCode = "primary";
  user: User
  user$: Subscription
  phoneCodes: any[] = PhoneCodes
  phoneCodesForm: PhoneCode[] = []


  firstName: string = ""
  lastName: string = ""
  email: string = ""
  password: string = ""
  phoneNumber: string = ""
  phoneCode: PhoneCode = null;
  sessionItem: string
  userForm: FormGroup

  constructor(
    private userService: GraphqpUserService,
    private element: ElementRef,
    private http: HttpClient,
  ) { }


  ngOnInit() {
    // console.log(this.phoneCodes.length)
    for (let i = 0; i < this.phoneCodes.length; i++) {
      this.phoneCodesForm.push(this.phoneCodes[i])

    }
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phoneNumber: new FormControl(),
      codeArea: new FormControl()
    });
    // sessionStorage.removeItem("ganteng")
    if (sessionStorage.getItem("user") != null) {
      this.sessionItem = sessionStorage.getItem("user")
      this.user = JSON.parse(this.sessionItem)

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

  register() {
    if (this.firstName.trim() == "") {
      alert("please insert first name")
      return
    }
    else if (this.lastName.trim() == "") {
      alert('please insert your last name');
      return

    } else if (this.email.trim() == '') {
      alert("please insert your email")
      return
    } else if (this.password.trim() == "") {
      alert("please insert your password")
      return
    } else if (this.password.length < 5) {
      alert("please insert your password at least 5 length")
      return
    } else if (this.phoneCode == null) {
      alert("please insert your phoneCode")
      return
    }


    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.email);
    console.log(this.password);
    console.log(this.phoneNumber);
    // console.log(this.lastName);
    this.user$ = this.userService.createUser(this.firstName, this.lastName, this.password, this.email, this.phoneNumber, this.phoneCode.name).subscribe(data => {
      this.user = data.data.createUser
      sessionStorage.setItem("user", JSON.stringify(this.user));
      if (this.user != null) {
        alert("register success")
        location.reload()
        return
      }
      // sessionStorage.getItem("ganteng");
    })
  }


  //FACEBOOk
  signInWithFB(): void {
    FB.login((response) => {
      if (response.authResponse) {
        ///what to do if success
        console.log(FB.user)
        // FB.
        // FB.signOut();
        FB.api('/me', { fields: 'first_name,last_name, email' }, (response) => {
          // console.log(response.first_name)
          console.log(response);
          console.log(response.email)

          let desc = {
            'firstName': response.first_name,
            'lastName': response.last_name,
            'email': response.email,
            'password': "",
            'phoneNumber': "",
            "facebookId": response.id
          }
          let facebookIsLogin = true;
          // sessionStorage.setItem("user", JSON.stringify(desc))
          // console.log(JSON.stringify(facebookIsLogin))
          // sessionStorage.setItem("fb", JSON.stringify(facebookIsLogin));

          // location.reload()

          this.userService.createUserFacebook(desc["firstName"], desc["lastName"], desc["email"], desc["facebookId"]).subscribe(m => {
            if (m.data.createUserWithFacebook.id != 0) {
              let user = m.data.createUserWithGoogle
              sessionStorage.setItem("user", JSON.stringify(user))
              alert("success")
              location.reload()
            } else {
              alert("fail")
              location.reload()
            }
          })


        });



      } else {
        //what to do if fail
      }

    }, {
      scope: "email",

    })

  }



  logOutWithFB(): void {
    FB.logout(() => {

    }
    )
  }



  //GOOGLE
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
    "https://www.googleapis.com/auth/user.phonenumbers.read"
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
    let http = this.http

    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();

        // console.log(googleUser.get())
        console.log(googleUser)
        console.log(googleUser['uc']["access_token"])
        console.log(profile)
        let email, userId;
        that.urlGoogle = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + googleUser['uc']["access_token"]
        console.log(that.urlGoogle)
        http.get(that.urlGoogle).subscribe(user => {
          console.log(user)
          userId = user["user_id"]
          email = user["email"]


          let desc = {
            'firstName': profile.getGivenName(),
            'lastName': profile.getFamilyName(),
            'email': email,
            'password': "",
            'phoneNumber': "",
            'googleId': userId
          }
          console.log(email)

          that.userService.createUserGoogle(desc["firstName"], desc["lastName"], desc["email"], desc["googleId"]).subscribe(m => {
            if (m.data.createUserWithGoogle.id != 0) {
              let user = m.data.createUserWithGoogle
              sessionStorage.setItem("user", JSON.stringify(user))
              alert("success")
              location.reload()
            } else {
              alert("fail")
              location.reload()
            }
          })


        })
        // let test = gapi.client.plus.people.get({'userId': 'me'})
        // console.log(test)
        // console.log(desc["email"])

        // sessionStorage.setItem("user", JSON.stringify(desc))
        // location.reload()



      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }



}
