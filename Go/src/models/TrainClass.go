package models

import "Connect/database"

type TrainClass struct{
  Id uint `gorm:"primary_key"'`
  ClassName string
  PricePercentage int
}


func GetTrainClass()([]TrainClass, error){
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var trainClass []TrainClass
  db.Find(&trainClass)
  return trainClass, nil
}
