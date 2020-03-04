package models

import (
  "Connect/database"
  "time"
)

type DetailEvent struct{
  Id int `gorm:"primary_key"`
  HeaderId int
  EntertainmentTicketId int `json:"entertainment_ticket_id"`
  EntertainmentTicket EntertainmentTicket `gorm:"foreign_key:entertainment_ticket_id"`
  Quantity int
  Type string
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetDetailEvents()[]DetailEvent{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var dts []DetailEvent
  db.Find(&dts)
  return dts
}



func  InsertDetailEvent(HeaderId int, EntertainmentTicketId int, Quantity int, Type string)DetailEvent{

  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  if error!=nil{
    panic(error)
  }

  db.Create(&DetailEvent{
    HeaderId:    HeaderId,
    EntertainmentTicketId: EntertainmentTicketId,
    Quantity:  Quantity,
    Type:      Type,
  })
  var dt DetailEvent


  db.Last(&dt)
  return dt
}
