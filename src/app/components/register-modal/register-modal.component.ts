import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup } from '@angular/forms';
import { GraphqpUserService } from 'src/app/services/graphqp-user.service';
import { Subscription } from 'rxjs';
import { Session } from 'protractor';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  selectedCode= "primary";
  user: User
  user$: Subscription

  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string

  sessionItem: string
  userForm: FormGroup

  constructor(
    private userService: GraphqpUserService,
  ) { }


  ngOnInit() {
    
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phoneNumber: new FormControl(),
      codeArea: new FormControl()
    });
    // sessionStorage.removeItem("ganteng")
   if(sessionStorage.getItem("user") != null){
     this.sessionItem = sessionStorage.getItem("user")
     this.user = JSON.parse(this.sessionItem)
     
   }


  }
  
  register(){
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.email);
    console.log(this.password);
    console.log(this.phoneNumber);
    // console.log(this.lastName);
    this.user$ = this.userService.createUser(this.firstName, this.lastName, this.password, this.email, this.phoneNumber).subscribe(data=>{
      this.user = data.data.createUser
      sessionStorage.setItem("user", JSON.stringify(this.user));
      // sessionStorage.getItem("ganteng");
    })
  }

  


}
