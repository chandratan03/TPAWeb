import { Component, OnInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { LoginModal2Component } from '../login-modal2/login-modal2.component';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User
  // temp: string
  hasUser: boolean
  constructor(public dialogLogin: MatDialog,
    private router:Router
    ) { }
  ngOnInit() {
    // sessionStorage.removeItem("user");
    this.user = JSON.parse(sessionStorage.getItem("user"))
    if(this.user != null){
      this.hasUser = true
    }else{
      this.hasUser=false
    }
  }
  openDialogLogin(){
    this.dialogLogin.open(LoginModalComponent, {
      width: "auto",
      height: "auto",
      minWidth: "400px",
      minHeight: "425px",
      panelClass:"dialogBox"
    })
  }

  openDialogLogin2(){
    console.log("test")
    this.dialogLogin.closeAll()
    this.dialogLogin.open(LoginModal2Component, {
      width: "auto",
      height: "auto",
      minWidth: "400px",
      minHeight: "425px",
      panelClass:"dialogBox"
    })
  }

  openDialogRegister(){
    this.dialogLogin.open(RegisterModalComponent, {
      panelClass: "dialogBox",
      width: "auto",
      height: "auto",
      minWidth: "400px",
      minHeight: "425px",
    })
  }

  logOut():void{
    sessionStorage.removeItem("user")
    if(sessionStorage.getItem("fb") == "true"){
      sessionStorage.removeItem("fb")
    }
    location.reload()
    
  }
  goToUser(){
    this.router.navigateByUrl('/user')
  }

}
