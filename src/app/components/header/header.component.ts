import { Component, OnInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { LoginModalComponent } from '../login-modal/login-modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  constructor(public dialogLogin: MatDialog) { }

  ngOnInit() {
    
  }
  openDialogLogin(){
    this.dialogLogin.open(LoginModalComponent, {
      width: "25%",
      height: "55%",
      minWidth: "400px",
      minHeight: "425px",
      panelClass:"loginPanel"
    })
  }

}
