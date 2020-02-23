package models

import (
  "Connect/database"
)

type HotelRoom struct{
  Id uint  `gorm:"primary_key"`
  HotelId int `json:"hotel_id"`
  Name string
  HotelRoomFacility []HotelRoomFacility `gorm:"foreignKey:hotel_id"`
  Price float64
  Quantity int
  ImagePath string
  Images[] Image `gorm:"foreignKey:hotel_room_id"`
  MaxGuest int
  HotelRoomBeds []HotelRoomBed `gorm:"foreignKey:hotel_room_id"`
  Space float32
  FreeBreakfast bool
  FreeWifi bool
}

func GetHotelRoomByHotelId(hotelId int)(  []HotelRoom,error){
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var hotelRooms []HotelRoom
  db.Where("hotel_id = ?", hotelId).Find(&hotelRooms)
  for i, _ := range hotelRooms{
    db.Model(&hotelRooms[i]).Related(&hotelRooms[i].HotelRoomBeds, "hotel_room_id").
      Model(&hotelRooms[i]).Related(&hotelRooms[i].Images, "hotel_room_id")
    for j, _ := range hotelRooms[i].HotelRoomBeds{
      db.Model(&hotelRooms[i].HotelRoomBeds[j]).Related(&hotelRooms[i].HotelRoomBeds[j].Bed, "bed_id")
    }
  }
  defer db.Close()
  return hotelRooms, nil
}


func GetHotelRooms()(  []HotelRoom,error){
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var hotelRooms []HotelRoom
  db.Find(&hotelRooms)
  defer db.Close()
  for i, _ := range hotelRooms{
    db.Model(&hotelRooms[i]).Related(&hotelRooms[i].HotelRoomBeds, "hotel_room_id").
      Model(&hotelRooms[i]).Related(&hotelRooms[i].Images, "hotel_room_id")

    for j, _ := range hotelRooms[i].HotelRoomBeds{
      db.Model(&hotelRooms[i].HotelRoomBeds[j]).Related(&hotelRooms[i].HotelRoomBeds[j].Bed, "bed_id")
    }



  }

  return hotelRooms, nil

}
