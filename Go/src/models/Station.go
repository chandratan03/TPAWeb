package models

import "Connect/database"

type Station struct{
  Id uint `gorm:"primary_key"`
  Name string
  StationCode string
  AreaId uint `json:"area_id"`
  Area Area `gorm:"foreignkey:area_id"`

}


func GetStations()([]Station, error){
  db, err:= database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var stations[] Station
  db.Find(&stations)

  for i := range stations{
    db.Model(&stations[i]).Related(&stations[i].Area, "area_id").
      Model(&stations[i].Area).Related(&stations[i].Area.City).
      Model(&stations[i].Area.City).Related(&stations[i].Area.City.Region)
  }

  return stations, nil
}
