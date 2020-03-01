package models

import (
  "Connect/database"
  "time"
)

type Promo struct {
  Id int `gorm:primary_key`
  Name string
  PromoPrice float64
  PromoCode string
  AvailableUntil time.Time
  Platform string
  PromoFor string
  Description string
  Image string
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetPromos()[]Promo{
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()

  var promos []Promo
  db.Find(&promos)
  return promos
}


func GetLatestPromo()Promo{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var promo Promo
  db.Last(&promo)
  return promo
}



