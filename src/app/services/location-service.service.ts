import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor() { }
   

  // get long lat
  getPosition(): Promise<any>
  {
    
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
       
        });
    });
  }

  getLocation(){

    navigator.geolocation.getCurrentPosition(success=>
        console.log(success)
      
      )
  }
}
