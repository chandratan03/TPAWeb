package models

import (
  "Connect/database"
  "time"
)

type Bank struct{
  Id int `gorm:"primary_key"`
  Name string
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetBanks()[]Bank{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()
  var banks []Bank
  db.Find(&banks)
  return banks
}


