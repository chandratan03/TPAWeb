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
  //City City `json: "city"`
  //CityId uint `json: "city_id" gorm: "foreignKey:CityId"
  AvailableDates []AvailableDateForHotel `gorm: "foreignkey:hotel_id"`

}

func GetHotels()([]Hotel, error){
   db, err := database.Connect()
   if err!=nil{
     return nil, err
   }
   //db.Joins("JOIN a")
   var hotels []Hotel
   //db.Model(&hotels).Related(&AvailableDateForHotel{})
   //db.Find(&hotels)
   //for hotel :=  range hotels {
   //  db.Joins("join available_date_for_hotels ON available_date_for_hotels.hotel_id = hotels.id").Find(&hotel)
   //}

  // rows, error := db.Table("hotels").Joins("join available_date_for_hotels on hotels.id = available_date_for_hotels.hotel_id ").Rows()
  //  if error!=nil{
  //    return nil, error
  //  }
  //
  // rows.Next(){
  //   var
  //
  //  hotels = append(hotels, )
  //}
  //db.Raw("SELECT * FROM hotels h join available_date_for_hotels a on a.hotel_id = h.id").Scan(&hotels)
  //var availableDates []AvailableDateForHotel
  // db.Model(&hotels).Related(&hote)
  db.Find(&hotels)

   for i, _:= range hotels{
      db.Model(&hotels[i]).Related(&hotels[i].AvailableDates, "hotel_id")
   }


  fmt.Println(hotels)
   return hotels, nil

}













