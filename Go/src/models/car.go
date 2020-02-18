package models

import (
  "Connect/database"
  "time"
)

type Car struct{
  Id uint `gorm:"primary_key"`
  Price float64
  BrandId uint `json:"brand_id"`
  Brand Brand `gorm:"foreigkey:brand_id"`
  VendorCars []VendorCar `gorm:"foreignkey:CarId"`

  Model string
  Capacity int
  Luggage int
  ImagePath string
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetCars() ([]Car, error){
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var cars []Car
  defer db.Close()
  db.Find(&cars)
  for i := range cars{
    db.Model(&cars[i]).Related(&cars[i].Brand, "brand_id")
      //Model(&cars[i]).Related(&cars[i].VendorCars, "car_id")
      db.Where("car_id = ?", cars[i].Id).Find(&cars[i].VendorCars)
    var minPrice float64
    minPrice= 0
    for j := range cars[i].VendorCars{
      db.Model(&cars[i].VendorCars[j]).Related(&cars[i].VendorCars[j].Area).
        Model(&cars[i].VendorCars[j].Area).Related(&cars[i].VendorCars[j].Area.City).
        Model(&cars[i].VendorCars[j].Area.City).Related(&cars[i].VendorCars[j].Area.City.Region).
        Model(&cars[i].VendorCars[j]).Related(&cars[i].VendorCars[j].Vendor)
      if j==0{
        minPrice = cars[i].VendorCars[j].Price
      }else{
        if minPrice > cars[i].VendorCars[j].Price{
          minPrice = cars[i].VendorCars[j].Price
        }
      }
      cars[i].Price = minPrice


    }

  }

  return cars, nil
}



