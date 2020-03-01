import { Component, OnInit } from '@angular/core';
import { PromoService } from 'src/app/services/promo.service';
import { Promo } from 'src/app/models/promo';
import { Subscription } from 'rxjs';
import { DeprecatedDatePipe } from '@angular/common';

@Component({
  selector: 'app-promo-page',
  templateUrl: './promo-page.component.html',
  styleUrls: ['./promo-page.component.scss']
})
export class PromoPageComponent implements OnInit {

  constructor(private promoService: PromoService) { }
  promo:Promo
  promo$: Subscription

  allPromos: Promo[]
  promos: Promo[]
  promos$: Subscription
  URL:string;
  FACEBOOKURL:string
  WHATSAPPURL:string
  ngOnInit() {
    this.URL = window.location.href
    this.FACEBOOKURL = "https://www.facebook.com/sharer/sharer.php?u="+this.URL;
    this.WHATSAPPURL = "https://api.whatsapp.com/send?text="+this.URL
    this.getLatestPromo()
    this.getPromos()

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.promo$.unsubscribe()
    this.promos$.unsubscribe()

  }
  date:string
  getLatestPromo():void{
    this.promo$ = this.promoService.GetLatestPromo().subscribe(q=>{
      this.promo = q.data.latestPromo
      this.promo.availableUntil = new Date(this.promo.availableUntil)
      this.date = this.promo.availableUntil.getDate().toString()
      this.date +=":"+this.promo.availableUntil.getMonth()
      this.date+=":"+this.promo.availableUntil.getFullYear()
    })

  }

  getPromos():void{
    this.promos$ = this.promoService.getPromos().subscribe(q=>{
      this.allPromos = q.data.promos
      this.promos=[]
      this.promos.push(...this.allPromos.slice(0,3))
    })
  }


  copyLink():void{
    navigator.clipboard.writeText(this.URL);
  }

  shareWhatsapp():void{
    window.open(this.WHATSAPPURL, "")
  }

  shareFacebook():void{
    window.open(this.FACEBOOKURL, "")
  }
}
