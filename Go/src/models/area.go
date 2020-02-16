package models

import "Connect/database"

type Area struct{
  Id uint `gorm:"primary_key"`
  AreaName string `json:"area_name"`
  CityId uint `json:"city_id"`
  City City `json:"city" gorm:"foreignKey:city_id"`
}

func GetAreas()([]Area, error){
  db, err := database.Connect()

  if err!=nil{
    panic(err)

  }
  defer db.Close()
  var areas []Area

  db.Find(&areas)


  return areas, nil



}



