package models


type HotelRoomFacility struct {
  Id uint `gorm:"primary_key"`
  HotelId int `json:"hotel_id"`
  FacilityId int `json:"facility_id"`
  Facility Facility `gorm:foreignkey`
}
