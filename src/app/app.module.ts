import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatCheckboxModule, MatDatepickerModule, MatOptionModule, MatNativeDateModule, MatButtonModule, MatProgressSpinnerModule, MatSliderModule, MatTooltip, MatTooltipModule, MatExpansionModule} from '@angular/material';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';
import {ApolloModule, Apollo} from 'apollo-angular';
import { HttpLinkModule, HttpLink }from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
  
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { RentcarCardComponent } from './components/rentcar-card/rentcar-card.component';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginModal2Component } from './components/login-modal2/login-modal2.component';
import { HotelSearchPageComponent } from './components/hotel-search-page/hotel-search-page.component';
import { HotelFilterComponent } from './components/hotel-filter/hotel-filter.component';
import {} from '@angular/material/checkbox';
import { FlightSearchPageComponent } from './components/flight-search-page/flight-search-page.component';
import { TrainCardComponent } from './components/train-card/train-card.component';
import { EntertainmentCardComponent } from './components/entertainment-card/entertainment-card.component';
import { HotelDetailSearchPageComponent } from './components/hotel-detail-search-page/hotel-detail-search-page.component'
import { componentFactoryName } from '@angular/compiler';
import { TrainSearchPageComponent } from './components/train-search-page/train-search-page.component';
import { HotelSearchComponent } from './components/hotel-search/hotel-search.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { ManageFlightComponent } from './components/manage-flight/manage-flight.component';
import { GraphqServiceComponent } from './services/graphq-service/graphq-service.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ManageTrainComponent } from './components/manage-train/manage-train.component';

@NgModule({
  exports: [
    MatDialogModule,
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
    HotelSearchPageComponent,
    HotelFilterComponent,
    FlightSearchPageComponent,
    TrainCardComponent,
    EntertainmentCardComponent,
    HotelDetailSearchPageComponent,
    TrainSearchPageComponent,
    HotelSearchComponent,
    RentCarComponent,
    ManageFlightComponent,
    GraphqServiceComponent,
    PopUpComponent,
    ManageTrainComponent,
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatTooltipModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule.forRoot([
      {
        path: '', component:HomePageComponent
      },
      {
        path: 'register', component:RegisterModalComponent
      },
      {
        path: 'hotel/search', component:HotelSearchPageComponent
      },
      {
        path: 'flight/search', component: FlightSearchPageComponent
      },
      {
        path: 'hotel/search/detail', component: HotelDetailSearchPageComponent
      },
      {
        path: 'train/search', component: TrainSearchPageComponent
      },
      {
        path: 'car/search',  component: RentCarComponent
      },
      {
        path: "manage/flight", component: ManageFlightComponent
      },
      {
        path: "manage/train", component: ManageTrainComponent
      }
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
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
