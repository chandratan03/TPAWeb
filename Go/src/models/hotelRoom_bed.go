package models


type HotelRoomBed struct{
  Id uint `gorm:"primary_key"`
  HotelRoomId uint `json:"hotel_room_id"`
  BedId uint `json:"bed_id"`
  Bed Bed `json:"bed" gorm:foreignKey`
}
