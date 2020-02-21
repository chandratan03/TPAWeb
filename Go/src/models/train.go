package models

import "Connect/database"

type Train struct{
  Id uint `gorm:"primary_key"'`
  Name string
  TrainTypeId int `json:"train_type_id"`
  TrainType TrainType `gorm:"foreignKey:train_type_id"`
  TrainClassId int `json:"train_class_id"`
  TrainClass TrainClass `gorm:"foreignKey: train_class_id"`
  TrainSubClass string
}

func GetTrains()([]Train, error){
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var trains []Train
  db.Find(&trains)

  for i:= range trains {
      db.Model(&trains[i]).Related(&trains[i].TrainClass, "train_class_id").
        Model(&trains[i]).Related(&trains[i].TrainType)
  }
  return trains, nil
}








