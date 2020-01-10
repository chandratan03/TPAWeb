package models

import (
  "Connect/database"
  "time"
)

type AvailableDateForHotel struct {
  DateId uint `gorm: "primary_key"`
  CreatedAt       time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
  Date time.Time `json :"date"`
  isAvailable bool `json: "is_available"`
  HotelID uint `json: "hotel_id" gorm:"foreignKey: hotel_id"`
}

func GetAvailableDateForHotels() ([]AvailableDateForHotel, error){
  db, err := database.Connect()
  if err!=nil{
    return nil, err
  }
  var dates []AvailableDateForHotel
  db.Find(&dates)
  return dates, nil
}
