package models

import (
  "Connect/database"
  "time"
)

type Entertainment struct{
  Id uint `gorm:"primary_key"`
  Name string
  Price float64
  Category string
  Longitude float64
  Latitude float64
  IsTrending bool
  CityId int `json:"city_id"`
  City City `gorm:"foreignKey:city_id"`
  Image string
  ImageEntertainments []ImageEntertainment
  Description string
  Terms string
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetEntertainments()[]Entertainment{
  db, error := database.Connect()

  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var entertainments []Entertainment
  db.Find(&entertainments)
  for i := range entertainments{
    db.Where("entertainment_id = ?", entertainments[i].Id).Find(&entertainments[i].ImageEntertainments)
    db.Model(&entertainments[i]).Related(&entertainments[i].City).
      Model(&entertainments[i].City).Related(&entertainments[i].City.Region)
  }

  return entertainments
}

func InsertEntertainment(name string, price float64, category string,
  isTrending bool,
  cityId int, image string, description string, terms string)Entertainment{
  db, error:= database.Connect()

  if error!=nil{
    panic(error)
  }
  defer db.Close()
  var entertainment Entertainment
  db.Create(&Entertainment{
    Name:                name,
    Price:               price,
    Category:            category,
    Longitude:           0,
    Latitude:            0,
    IsTrending:          isTrending,
    CityId:              cityId,
    Image:               image,
    Description:         description,
    Terms: terms,

  })

  db.Last(&entertainment)
  db.Where("entertainment_id = ?", entertainment.Id).Find(&entertainment.ImageEntertainments)
  db.Model(&entertainment).Related(&entertainment.City).
    Model(&entertainment.City).Related(&entertainment.City.Region)
  entertainment.Longitude = entertainment.City.Longitude
  entertainment.Latitude = entertainment.City.Latitude
  db.Save(&entertainment)

  return  entertainment
}


func UpdateEntertainment(id int,name string, price float64, category string,
  isTrending bool,
  cityId int, image string, description string, terms string)Entertainment{
  db, error:= database.Connect()

  if error!=nil{
    panic(error)
  }
  defer db.Close()
  var entertainment Entertainment
  db.Where("id = ?", id).Find(&entertainment)

  entertainment.Name = name
  entertainment.Price = price
  entertainment.Category = category
  //entertainment.Longitude =longitude
  entertainment.IsTrending =isTrending
  entertainment.CityId= cityId
  entertainment.Image = image
  entertainment.Description = description
  entertainment.Terms = terms
  db.Save(&entertainment)




  // ambil lagi

  db.Where("id = ?", id).Find(&entertainment)

  db.Where("entertainment_id = ?", entertainment.Id).Find(&entertainment.ImageEntertainments)
  db.Model(&entertainment).Related(&entertainment.City).
    Model(&entertainment.City).Related(&entertainment.City.Region)

  entertainment.Longitude = entertainment.City.Longitude
  entertainment.Latitude = entertainment.City.Latitude

  db.Save(&entertainment)

  return  entertainment
}


func DeleteEntertainment(id int)Entertainment{
  db, error:= database.Connect()

  if error!=nil{
    panic(error)
  }
  defer db.Close()
  var entertainment Entertainment
  db.Where("id = ?", id).Find(&entertainment)
  db.Delete(&entertainment)

  return  entertainment
}



