import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';

@Component({
  selector: 'app-login-modal2',
  templateUrl: './login-modal2.component.html',
  styleUrls: ['./login-modal2.component.scss']
})
export class LoginModal2Component implements OnInit {
  constructor(
    private userService: GraphqpUserService
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

  
}
