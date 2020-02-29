package models

import (
  "Connect/database"
  "time"
)

type DetailTransaction struct{
  Id int `gorm:"primary_key"`
  HeaderId int
  FlightId int `json:"flight_id"`
  Flight Flight `gorm:"foreign_key:flight_id"`
  Quantity int
  Type string
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetDetailTransactions()[]DetailTransaction{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var dts []DetailTransaction

  db.Find(&dts)
  return dts
}



func  InsertDetailTransaction(HeaderId int, FlightId int, Quantity int, Type string)DetailTransaction{

  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  if error!=nil{
    panic(error)
  }

  db.Create(&DetailTransaction{
    HeaderId:    HeaderId,
    FlightId:  FlightId,
    Quantity:  Quantity,
    Type:      Type,
  })
  var dt DetailTransaction

  db.Last(&dt)
  return dt
}
