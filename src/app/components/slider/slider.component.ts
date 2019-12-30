import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
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
export class SliderComponent implements OnInit {
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
    "../../../assets/image-sliders/image1.jpg",
    "../../../assets/image-sliders/image2.jpg",
    "../../../assets/image-sliders/image3.jpg",
    "../../../assets/image-sliders/image4.jpg",
    "../../../assets/image-sliders/image5.jpg",
    "../../../assets/image-sliders/image6.jpg",
    "../../../assets/image-sliders/image7.jpg"
    
    
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
    if(this.imageIndex==6){
      this.imageIndex=0;
    }else{
      this.imageIndex++;
    }
  }
  
  prevImage():void{
    if(this.imageIndex==0){
      this.imageIndex=6;
    }else{
      this.imageIndex--;
    }
  }
}
