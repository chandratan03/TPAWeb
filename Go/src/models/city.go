package models

import "Connect/database"

type City struct{
  Id uint `gorm: "primary_key"`
  CityName string `json:"city_name" db:"city_name"`
  CityCode string
  RegionId uint `json:"region_id" `
  Region Region `gorm: foreignkey:"region_id"`
  Locations[] Location `json:"locations" gorm: foreignkey:"location_id"`
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
  db.Model(&city).Related(&city.Region, "city_id")
  db.Find(&city, id)
  return city
}

func GetCities() ([]City, error) {
  db, err := database.Connect()
  if err!=nil {
    panic(err)
  }

  var cities []City
  db.Find(&cities)

  for i, _ := range cities{
    db.Model(&cities[i]).Related(&cities[i].Locations, "city_id")
    db.Model(&cities[i]).Related(&cities[i].Region, "city_id")
  }
  return cities,nil
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


