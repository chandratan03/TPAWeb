package models


type ImageEntertainment struct{
  Id uint `gorm:"primary_key"`
  EntertainmentId uint `json:"entertainment_id"`
  Path string
}
