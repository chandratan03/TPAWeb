import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-card',
  templateUrl: './quick-card.component.html',
  styleUrls: ['./quick-card.component.scss']
})
export class QuickCardComponent implements OnInit {
  no: number = 1;
  constructor() { }

  ngOnInit() {
    
  }
  
  click1(): void{
    this.no=1;
  }
  
  click2(): void{
    this.no=2;
  }
  click3(): void{
    this.no=3;
  }
  click4(): void{
    this.no=4;
  }
  click5(): void{
    this.no=5;
  }



}
