package models

import "Connect/database"

type City struct{
  CityId uint `gorm: "primary_key"`
  CityName string `json:"city_name" db:"city_name"`
  RegionId uint `json:"region_id"`
  Region Region `gorm: foreignkey:"RegionId"`
}

//func TableName(City) string {
//  return "city"
//}

func GetCityById(id uint) City {
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var city City
  db.Joins("join regions on regions.id = cities.region_id").Where("id = ?", id).Find(&city)
  db.Find(&city, id)
  return city
}

func GetCities() []City {
  db, err := database.Connect()
  if err!=nil {
    panic(err)
  }

  var cities []City
  db.Find(&cities)
  return cities
}
func GetCitiesByName(name string) []City {
  db, err := database.Connect()
  if err!=nil {
    panic(err)
  }
  var cities []City
  db.Where("city_name = ?", name).Find(&cities)
  return cities
}

func CreateCity(cityName string,regionId uint) City{
  db, err := database.Connect()
  if err!=nil{
    panic(nil)
  }
  city :=  City{
    CityName: cityName,
    RegionId: regionId,
  }
  db.Create(&city)
  db.Last(&city)
  return city
}


