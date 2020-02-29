import { Component, OnInit } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-event-slider',
  templateUrl: './event-slider.component.html',
  styleUrls: ['./event-slider.component.scss'],
  animations:[
    trigger('sliding', [
      state('image1', style({
        left: 0,
      })),
      state('image2', style({
        left: '-100%'
      })),
      state('image3', style({
        left: '100%'
      })),
      transition('image1<=>image2', animate('0.3s')),
      transition('image3<=>image1', animate('0.3s'))
    ]),
  ]
})
export class EventSliderComponent implements OnInit {

  imageIndex:number=0;
  imageState:string="image1"//state
  imageReady:boolean=true
  constructor() { }

  ngOnInit() {
    (setInterval(()=>{
      this.changeImageStateLeft();
    },3000))
  }

  paths:string[] = [
    "../../../assets/entertainment/slider/1.jpg",
    "../../../assets/entertainment/slider/2.jpg",
    "../../../assets/entertainment/slider/3.jpg",
    "../../../assets/entertainment/slider/4.jpg",
    "../../../assets/entertainment/slider/5.jpg",
    "../../../assets/entertainment/slider/6.jpg",
  ];
  changeImageStateLeft():void{
    if(this.imageReady==false) return;
    this.imageReady=false;
    this.imageState = "image2"
    setTimeout(()=>{
      this.prevImage()
      this.imageState = "image3"
    },500)
    setTimeout(()=>
    {
      this.imageState="image1"
      this.imageReady=true;
    },500)
  }

  changeImageStateRight():void{
    
    if(this.imageReady==false) return;
    this.imageReady=false
    this.imageState = "image3"
    setTimeout(()=>{
      this.nextImage()
      this.imageState = "image2"
    },300)
    setTimeout(()=>{
      this.imageState="image1"
      this.imageReady=true
    },300)
  }

  nextImage():void{
    if(this.imageIndex==5){
      this.imageIndex=0;
    }else{
      this.imageIndex++;
    }
  }
  
  prevImage():void{
    if(this.imageIndex==0){
      this.imageIndex=5;
    }else{
      this.imageIndex--;
    }
  }

}
