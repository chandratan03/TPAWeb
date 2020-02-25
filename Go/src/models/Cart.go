package models

import (
  "Connect/database"
  "time"
)

type Cart struct{
  Id int `gorm:"primary_key"`
  UserId int
  FlightId int `json:"flight_id"`
  Flight Flight `json:"foreingKey:flight_id"`
  Quantity int
  Type string
  Date time.Time
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetCarts()[]Cart{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var carts []Cart

  db.Find(&carts)
  return carts
}

func GetCartsByUserId(userId int)[]Cart{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var carts []Cart

  db.Where("user_id = ?", userId).Find(&carts)
  return carts
}

func DeleteCartById(id int)Cart{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()
  var cart Cart

  db.Where("id =?", id).Find(&cart)
  db.Delete(cart)
  return cart
}

func InsertCart(UserId int, FlightId int, Quantity int, Type string, Date string)Cart{

  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()
  DateInsert, error := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", Date)

  if error!=nil{
    panic(error)
  }

  db.Create(&Cart{
    UserId:    UserId,
    FlightId:  FlightId,
    Quantity:  Quantity,
    Type:      Type,
    Date:      DateInsert,
  })
  var cart Cart

  db.Last(&cart)
  return cart
}

