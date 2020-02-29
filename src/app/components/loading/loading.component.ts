import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
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
    ])],
})


export class LoadingComponent implements OnInit {
  @Input() isOpen= false;
  constructor() { }

  ngOnInit() {
  }

}
