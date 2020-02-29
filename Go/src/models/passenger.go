package models

import "Connect/database"

type Passenger struct {
  Id int `gorm:"primary_key"`
  Title string
  Name string
  Nationality string
  HeaderId int `gorm:"primary_key"`
}


func GetPassengers()[]Passenger{
  db, err := database.Connect()
  if err!=nil{
    panic(db)
  }
  defer db.Close()
  var passengers []Passenger
  db.Find(&passengers)
  return passengers
}

func InsertPassenger(Title string, Name string, Nationality string, HeaderId int )Passenger{
  db, err := database.Connect()
  if err!=nil{
    panic(db)
  }
  defer db.Close()
  db.Create(&Passenger{
    Title:       Title,
    Name:        Name,
    Nationality: Nationality,
    HeaderId:    HeaderId,
  })
  var passenger Passenger
  db.Last(&passenger)
  return passenger
}


