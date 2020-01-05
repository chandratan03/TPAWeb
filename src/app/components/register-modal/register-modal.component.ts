import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  selectedCode= "primary";
  user: User
  // firstName: string;
  userForm: FormGroup

  constructor() { }


  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phoneNumber: new FormControl(),
      codeArea: new FormControl()
   });
  }
  


}
