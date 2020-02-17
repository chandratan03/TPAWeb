package models

import "Connect/database"

type Train struct{
  Id uint `gorm:"primary_key"'`
  Name string
  TrainClassId int `json:"train_class_id"`
  TrainClass TrainClass `gorm:"foreignkey:train_class_id"`
  TrainSubClass string
}

func GetTrains()([]Train, error){
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  var trains []Train
  db.Find(&trains)

  for i:= range trains {
      db.Model(&trains[i]).Related(&trains[i].TrainClass, "train_class_id")
  }
  return trains, nil
}








