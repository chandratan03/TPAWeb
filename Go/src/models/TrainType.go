package models

import (
  "Connect/database"
  "time"
)

type TrainType struct{
  Id uint `gorm:primary_key`
  CreatedAt		time.Time
  UpdatedAt		time.Time
  DeletedAt		*time.Time		`sql:index`
  Name string

}

func GetTrainTypes()([]TrainType, error){
  db,err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var TrainTypes []TrainType
  db.Find(&TrainTypes)

  return TrainTypes,nil

}
