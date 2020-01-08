import { Component, OnInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { LoginModal2Component } from '../login-modal2/login-modal2.component';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User
  // temp: string
  hasUser: boolean
  constructor(public dialogLogin: MatDialog) { }
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
      width: "25%",
      height: "60%",
      minWidth: "400px",
      minHeight: "425px",
      panelClass:"dialogBox"
    })
  }

  openDialogLogin2(){
    console.log("test")
    this.dialogLogin.closeAll()
    this.dialogLogin.open(LoginModal2Component, {
      width: "25%",
      height: "60%",
      minWidth: "400px",
      minHeight: "425px",
      panelClass:"dialogBox"
    })
  }

  openDialogRegister(){
    this.dialogLogin.open(RegisterModalComponent, {
      panelClass: "dialogBox",
      width: "25%",
      height: "60%",
      minWidth: "400px",
      minHeight: "425px",
    })
  }

  logOut():void{
    sessionStorage.removeItem("user")
    location.reload()
    
  }

}
