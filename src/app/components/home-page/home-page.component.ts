import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  
})
export class HomePageComponent implements OnInit {
  
  constructor() { }
  quickCardIsClicked: boolean = false

  // quickCardElement: HTMLElement
  // overlayElement: HTMLElement
  
  ngOnInit() {
    
    // this.quickCardElement = document.getElementById("quick-card")
    // this.overlayElement = document.getElementById("overlay")
  }

  quickCardClicked(quickCard: HTMLElement, overlay:HTMLElement): void{
    console.log("asd")
    if(this.quickCardIsClicked == false){
      this.quickCardIsClicked=true
      // this.quickCardElement.style.zIndex = "11"
      // this.overlayElement.style.display = "block"
      // this.overlayElement.style.zIndex = "10"
      quickCard.style.zIndex = "11";
      overlay.style.zIndex = "10"
      overlay.style.display = "block"
    }
  }
  

  overlayClicked(quickCard: HTMLElement, overlay:HTMLElement){
    if(this.quickCardIsClicked == true){
      this.quickCardIsClicked = false
      quickCard.style.zIndex = "5"
      overlay.style.zIndex = "-20"
      overlay.style.display = "none"
    }
  }

  sendMessage():void{
    window.open("https://api.whatsapp.com/send?phone=082172207470", "")
  }

}
