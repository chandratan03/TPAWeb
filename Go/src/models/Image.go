package models


type Image struct{
  Id uint `gorm:"primary_key"`
  HotelRoomId uint `json:"hotel_room_id"`
  Path string
}
