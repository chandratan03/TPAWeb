package models

import "Connect/database"

type Region struct{
  ID        uint `gorm:"primary_key"`
  RegionName string `json:"region_name" db:"region_name"`
  CountryCode string `json:"country_code""`
  City[] City  `gorm:"foreignkey:city_id"`
}

func GetRegions()([]Region, error){
  db, err := database.Connect()
  if err!=nil {
    return nil, nil
  }
  var regions []Region
  db.Find(&regions)
  return regions, nil
}

func GetRegionById(id uint)(Region){
  db, err := database.Connect()
  if err!=nil{
    panic(nil)
  }
  var region Region
  db.Where("id = ?", id).Find(&region)
  return region
}

func GetRegionByName(name string)(Region){
  db, err := database.Connect()
  if err!=nil {
    panic(nil)
  }

  var region Region
  db.Where("region_name = ?", name).Find(&region)
  return region


}

func CreateRegion(name string) Region{
  db, err := database.Connect()
  if err!=nil{
    panic(nil)
  }
  region :=Region{
    RegionName: name,
  }
  db.Create(&region)
  db.Last(&region)
  return region
}




