import { Component, OnInit, Input } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  animations:[
    trigger('openClosePopUp',[
      state('open', style({
        display: "flex",
        transform: "scale(1)",
        opacity: 1,
      })),
      state('close', style({
        display: "none",
        transform: "scale(0)",
        opacity: 0,
      })),
      transition('open=>close, close=>open',[animate('0.25s')])
    ])


  ]
})
export class PopUpComponent implements OnInit {

  @Input() isOpen= false;
 
  constructor() { }

  ngOnInit() {
  }

}
