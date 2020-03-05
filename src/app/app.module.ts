import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes, Router} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatCheckboxModule, MatDatepickerModule, MatOptionModule, MatNativeDateModule, MatButtonModule, MatProgressSpinnerModule, MatSliderModule, MatTooltip, MatTooltipModule, MatExpansionModule, MatStepperModule, MatRadioModule, MatIconModule, MatTabsModule} from '@angular/material';
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
import { ManageHotelComponent } from './components/manage-hotel/manage-hotel.component';
import { HotelSearchPage2Component } from './components/hotel-search-page2/hotel-search-page2.component';
import { MapComponent } from './components/map/map.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventPageComponent } from './components/event-page/event-page.component';
import { EventSearchComponent } from './components/event-search/event-search.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventSliderComponent } from './components/event-slider/event-slider.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { NewPostBlogComponent } from './components/new-post-blog/new-post-blog.component';
import { DetailBlogComponent } from './components/detail-blog/detail-blog.component';
import { SafePipe } from './pipe/safe.pipe';
import { PromoPageComponent } from './components/promo-page/promo-page.component';
import { ManageEventPageComponent } from './components/manage-event-page/manage-event-page.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventOrderComponent } from './components/event-order/event-order.component';
import { ChatComponent } from './components/chat/chat.component';
const token = "lksdflkajsdlfkjaf"
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
    ManageHotelComponent,
    HotelSearchPage2Component,
    MapComponent,
    CheckoutComponent,
    ChatPageComponent,
    LoadingComponent,
    EventPageComponent,
    EventSearchComponent,
    EventCardComponent,
    EventSliderComponent,
    UserPageComponent,
    BlogPageComponent,
    NewPostBlogComponent,
    DetailBlogComponent,
    SafePipe,
    PromoPageComponent,
    ManageEventPageComponent,
    ManageBlogComponent,
    EventDetailComponent,
    EventOrderComponent,
    ChatComponent,
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
    MatStepperModule,
    MatRadioModule,
    CalendarModule,
    MatIconModule,
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
        path: 'hotel/search/detail/:id', component: HotelDetailSearchPageComponent
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
      },
      {
        path: "manage/hotel", component: ManageHotelComponent,
      },
      {
        path: "cart/checkout", component: CheckoutComponent,
      },
      {
        path:'chatPage', component:ChatPageComponent,
      },
      {
        path:'chat', component:ChatComponent
      },
      {
        path:'event', component:EventPageComponent,
      },
      {
        path:'event/search', component:EventSearchComponent,
      },
      {
        path:'event/search/:category', component: EventSearchComponent,
      },
      {
        path:'event/search/:category/:id', component: EventSearchComponent,
      },
      {
        path:'user', component:UserPageComponent,
      },
      {
        path:'blog', component:BlogPageComponent,
      },
      {
        path:'blog/new', component:NewPostBlogComponent
      },
      {
        path:'blog/detail', component:DetailBlogComponent
      },
      {
        path: 'blog/detail/:id', component:DetailBlogComponent
      },
      {
        path: 'promo', component:PromoPageComponent
      },
      {
        path: 'manage/blog', component:ManageBlogComponent
      },
      {
        path:'manage/event', component:ManageEventPageComponent,
      },
      {
        path: 'event/detail/:id', component:EventDetailComponent,
      },
      {
        path: 'event/order/:id/:qty', component:EventOrderComponent
      }
      
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    CalendarModule.forRoot({ 
      provide: DateAdapter, useFactory: adapterFactory 
    }),
  ],
  providers: [
   SafePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ){
    apollo.create({
      link: httpLink.create({uri:'http://localhost:8000/'+token+'/API'}),
      cache: new InMemoryCache()
    })
  }
}
