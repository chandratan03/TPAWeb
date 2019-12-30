import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatDialogModule} from '@angular/material';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';

import {
  GoogleApiModule, 
  // GoogleApiService, 
  // GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { RentcarCardComponent } from './components/rentcar-card/rentcar-card.component';
import { SliderComponent } from './components/slider/slider.component';


let gapiClientConfig: NgGapiClientConfig = {
  client_id: "928387927303-m0ecfie9ug0dflt54b046qc887fmu9r4.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  ux_mode: "redirect",
  redirect_uri: "http://localhost:4200",
  scope: [
      "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" ")
};




@NgModule({
  exports: [
    MatDialogModule,
    GoogleApiModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    LoginModalComponent,
    QuickCardComponent,
    FlightCardComponent,
    HotelCardComponent,
    RegisterModalComponent,
    RentcarCardComponent,
    SliderComponent,
  ],
  entryComponents: [LoginModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '', component:HomePageComponent
      },
      {
        path:'tiket-card', component:FlightCardComponent
      },
      {
        path:'hotel-card', component: HotelCardComponent 
      },
      {
        path:'rentcar-card', component: RentcarCardComponent 
      },
      

    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
