package models

import (
  "Connect/database"
  "fmt"
  "time"
)

type Hotel struct{
  ID uint `gorm:"primary_key"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
  HotelName string `json:"hotel_name"`
  Price uint32 `json:"price"`
  Rate int `json:Rate`
  LocationId int `json: "location_id"`
  Location Location `json "location" gorm:foreignKey`
  DiscountPercentage int `json: "discount_percentage"`
  DiscountPrice int `json:"discount_price"`
  //City City `json: "city"`
  //CityId uint `json: "city_id" gorm: "foreignKey:CityId"
  //AvailableDates []AvailableDateForHotel `: "foreignkey:hotel_id"`
  HotelFacilities[] HotelFacility `gorm:"foreignKey:HotelId"`
  Address string
  Quantity int `json:qty`
  ImagePath string
}

func GetHotels()([]Hotel, error){
   db, err := database.Connect()
   if err!=nil{
     return nil, err
   }

   var hotels []Hotel

   db.Find(&hotels)
   for i:= range hotels{
     //db.Model(&hotels[i]).Related(&hotels[i].AvailableDates, "hotel_id")
      db.Model(&hotels[i]).Related(&hotels[i].Location, "location_id").Model(&hotels[i].Location).
      Related(&hotels[i].Location.City).Model(&hotels[i].Location.City).Related(&hotels[i].Location.City.Region).
      Model(&hotels[i]).Related(&hotels[i].HotelFacilities, "HotelId")
      //println(hotels[i].Facilities[0].HotelId)
      for j, _ := range hotels[i].HotelFacilities{
         db.Model(&hotels[i].HotelFacilities[j]).Related(&hotels[i].HotelFacilities[j].Facility, "Id")
         println(hotels[i].HotelFacilities[j].Facility.Name)
      }




      //db.Model(&hotels[i]).Related(&hotels[i].Location)



      //print(hotels[i].ID)
      //hotelFacilities := GetHotelFacilitiesByHotelId(hotels[i].ID)
      ////println(hotelFacilities[0].Id)
      //for j := range hotelFacilities{
      //  f, err := GetFacilityByID(hotelFacilities[j].FacilityId)
      //  if err!=nil{
      //   hotels[i].Facilities = append(hotels[i].Facilities, f)
      //  }
      //}

   }




  fmt.Println(hotels)
   return hotels, nil

}













