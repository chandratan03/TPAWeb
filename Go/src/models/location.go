package models

import (
  "Connect/database"
  "time"
)

type Location struct{
  Id int `gorm:"primary_key"`
  CreatedAt	time.Time
  UpdatedAt	time.Time
  DeletedAt	*time.Time	`sql:index`
  Longitude	float32
  Latitude	float32
  ZoomLevel int
  CityId	int `json:"city_id"`
  City City `gorm:"foreignkey:city_id"`
}

func GetLocations()([]Location, error){
  db, err:= database.Connect()

  if err!=nil {
    panic(err)
  }
  var locations[] Location
  db.Find(&locations)

  for i:= range locations{
    //city := &locations[i].City
    db.Model(&locations[i]).Related(&locations[i].City).Model(&locations[i].City).Related(&locations[i].City.Region)
  }
  defer db.Close()
  return locations, nil






}

