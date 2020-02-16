package models

import "time"

type Rating struct{
  Id uint `gorm:"primary_key"`
  HotelId int `json:"hotel_id"`
  Description string
  RateScore float32
  Date time.Time
}


