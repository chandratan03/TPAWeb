import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';
import {ApolloModule, Apollo} from 'apollo-angular';
import { HttpLinkModule, HttpLink }from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginModal2Component } from './components/login-modal2/login-modal2.component';


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
    LoginModal2Component,
  ],
  entryComponents: [LoginModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule, 
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    
    RouterModule.forRoot([
      {
        path: '', component:HomePageComponent
      },
      {
        path: 'register', component:RegisterModalComponent
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
export class AppModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ){
    apollo.create({
      link: httpLink.create({uri:'http://localhost:8000'}),
      cache: new InMemoryCache()
    })
  }
}
