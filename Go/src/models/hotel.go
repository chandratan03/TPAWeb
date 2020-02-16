package models

import (
  "Connect/database"
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
  //LocationId int `json: "location_id"`
  //Location Location `json "location" gorm:foreignKey`

  DiscountPercentage int `json: "discount_percentage"`
  DiscountPrice int `json:"discount_price"`
  //City City `json: "city"`
  //CityId uint `json: "city_id" gorm: "foreignKey:CityId"
  //AvailableDates []AvailableDateForHotel `: "foreignkey:hotel_id"`
  HotelFacilities[] HotelFacility `gorm:"foreignKey:HotelId"`

  Address string
  Quantity int `json:qty`
  ImagePath string
  Longitude	float32
  Latitude	float32
  ZoomLevel int
  CityId	int `json:"city_id"`
  City City `gorm:"foreignkey:city_id"`

  ///////////////////////////////////////////////////////<<THIS
  HotelRooms[] HotelRoom `gorm:"foreignKey:hotel_id"`

  AreaId uint  `json:"area_id"`
  Area Area `gorm:"foreignkey:area_id"`
  Ratings[] Rating `gorm:"hotel_id"`
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
      db.Model(&hotels[i]).
      Related(&hotels[i].City).Model(&hotels[i].City).Related(&hotels[i].City.Region).
      Model(&hotels[i]).Related(&hotels[i].HotelFacilities, "HotelId").
        Model(&hotels[i]).Related(&hotels[i].HotelRooms, "hotel_id").
        Model(&hotels[i]).Related(&hotels[i].Ratings).
        Model(&hotels[i]).Related(&hotels[i].Area, "area_id").
        Model(&hotels[i].Area).Related(&hotels[i].Area.City).
        Model(&hotels[i].Area.City).Related(&hotels[i].Area.City.Region)
      //println(hotels[i].Facilities[0].HotelId)
      for j, _ := range hotels[i].HotelFacilities{
         db.Model(&hotels[i].HotelFacilities[j]).Related(&hotels[i].HotelFacilities[j].Facility, "facility_id")
         //println(hotels[i].HotelFacilities[j].Facility.Name)
      }
     for j, _ := range hotels[i].HotelRooms{
       db.Model(&hotels[i].HotelRooms[j]).Related(&hotels[i].HotelRooms[j].HotelRoomBeds, "hotel_room_id")
       for k, _:= range hotels[i].HotelRooms[j].HotelRoomBeds{
         db.Model(&hotels[i].HotelRooms[j].HotelRoomBeds[k]).Related(&hotels[i].HotelRooms[j].HotelRoomBeds[k].Bed)
       }
     }
   }
  //fmt.Println(hotels)
  println(hotels[0].Area.Id)
  defer db.Close()
   return hotels, nil
}

func GetHotelById(id uint)(Hotel, error){
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }

  var hotel Hotel

  db.Where("id= ?",id).Find(&hotel)
    //db.Model(&hotels[i]).Related(&hotels[i].AvailableDates, "hotel_id")
  db.Model(&hotel).Model(&hotel).
    Related(&hotel.City).Model(&hotel.City).Related(&hotel.City.Region).
    Model(&hotel).Related(&hotel.HotelFacilities, "HotelId").
    Model(&hotel).Related(&hotel.HotelRooms, "hotel_id").
    Model(&hotel).Related(&hotel.Ratings).
    Model(&hotel).Related(&hotel.Area, "area_id").
    Model(&hotel.Area).Related(&hotel.Area.City).
    Model(&hotel.Area.City).Related(&hotel.Area.City.Region)

  for j, _ := range hotel.HotelFacilities{
    db.Model(&hotel.HotelFacilities[j]).Related(&hotel.HotelFacilities[j].Facility, "facility_id")
    //println(hotel.HotelFacilities[j].Facility.Name)
  }

  for j, _ := range hotel.HotelRooms{
    db.Model(&hotel.HotelRooms[j]).Related(&hotel.HotelRooms[j].HotelRoomBeds, "hotel_room_id").
      Model(&hotel.HotelRooms[j]).Related(&hotel.HotelRooms[j].Images,"hotel_room_id")
    for k, _:= range hotel.HotelRooms[j].HotelRoomBeds{
      db.Model(&hotel.HotelRooms[j].HotelRoomBeds[k]).Related(&hotel.HotelRooms[j].HotelRoomBeds[k].Bed)
    }

  }
  defer db.Close()
  //fmt.Println(hotels)
  return hotel, nil


}














