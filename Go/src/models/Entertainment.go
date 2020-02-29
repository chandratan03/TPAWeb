package models

import (
  "Connect/database"
  "time"
)

type Entertainment struct{
  Id uint `gorm:"primary_key"`
  Name string
  Price float64
  Category string
  Longitude float64
  Latitude float64
  IsTrending bool
  CityId int `json:"city_id"`
  City City `gorm:"foreignKey:city_id"`
  Image string
  ImageEntertainments []ImageEntertainment
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetEntertainments()[]Entertainment{
  db, error := database.Connect()

  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var entertainments []Entertainment
  db.Find(&entertainments)
  for i := range entertainments{
    db.Where("entertainment_id = ?", entertainments[i].Id).Find(&entertainments[i].ImageEntertainments)
    db.Model(&entertainments[i]).Related(&entertainments[i].City).
      Model(&entertainments[i].City).Related(&entertainments[i].City.Region)
  }

  return entertainments
}



