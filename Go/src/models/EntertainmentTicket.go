package models

import (
  "Connect/database"
  "time"
)

type EntertainmentTicket struct{
  Id uint `gorm:"primary_key"`
  Date time.Time
  EntertainmentId int `json:"entertainment_id"`
  Entertainment Entertainment `gorm:"foreignKey:entertainment_id"`
  Price float64
  DiscountPercentage int
}

func GetEntertainmentTickets() []EntertainmentTicket{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var entertainmentTickets []EntertainmentTicket
  db.Find(&entertainmentTickets)
  for i:=range entertainmentTickets{
    db.Where("entertainment_id = ?", &entertainmentTickets[i].Entertainment.Id).Find(&entertainmentTickets[i].Entertainment.ImageEntertainments)
    db.Model(&entertainmentTickets[i]).Related(&entertainmentTickets[i].Entertainment).
      Model(&entertainmentTickets[i].Entertainment).Related(&entertainmentTickets[i].Entertainment.City).
      Model(&entertainmentTickets[i].Entertainment.City).Related(&entertainmentTickets[i].Entertainment.City.Region)
  }
  return entertainmentTickets
}


func GetEntertainmentTicketByCategory(category string)[]EntertainmentTicket{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var entertainmentTickets []EntertainmentTicket
  var temps []EntertainmentTicket
  db.Find(&entertainmentTickets)
  for i:=range entertainmentTickets{
    db.Where("entertainment_id = ?", &entertainmentTickets[i].Entertainment.Id).Find(&entertainmentTickets[i].Entertainment.ImageEntertainments)
    db.Model(&entertainmentTickets[i]).Related(&entertainmentTickets[i].Entertainment).
      Model(&entertainmentTickets[i].Entertainment).Related(&entertainmentTickets[i].Entertainment.City).
      Model(&entertainmentTickets[i].Entertainment.City).Related(&entertainmentTickets[i].Entertainment.City.Region)
  }
  for i:= range entertainmentTickets{
    if entertainmentTickets[i].Entertainment.Category == category{
      temps= append(temps, entertainmentTickets[i])
    }
  }

  return temps

}

func GetEntertainmentTicketByCategoryAndCityId(category string, cityId int)[]EntertainmentTicket{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()

  var entertainmentTickets []EntertainmentTicket
  var temps []EntertainmentTicket
  db.Find(&entertainmentTickets)
  for i:=range entertainmentTickets{
    db.Where("entertainment_id = ?", &entertainmentTickets[i].Entertainment.Id).Find(&entertainmentTickets[i].Entertainment.ImageEntertainments)
    db.Model(&entertainmentTickets[i]).Related(&entertainmentTickets[i].Entertainment).
      Model(&entertainmentTickets[i].Entertainment).Related(&entertainmentTickets[i].Entertainment.City).
      Model(&entertainmentTickets[i].Entertainment.City).Related(&entertainmentTickets[i].Entertainment.City.Region)
  }
  for i:= range entertainmentTickets{
    if entertainmentTickets[i].Entertainment.Category == category && entertainmentTickets[i].Entertainment.City.Id == uint(cityId){
      temps= append(temps, entertainmentTickets[i])
    }
  }
  return temps
}

func GetEntertainmentTicketByCityId( cityId int)[]EntertainmentTicket{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var entertainmentTickets []EntertainmentTicket
  var temps []EntertainmentTicket
  db.Find(&entertainmentTickets)
  for i:=range entertainmentTickets{
    db.Where("entertainment_id = ?", &entertainmentTickets[i].Entertainment.Id).Find(&entertainmentTickets[i].Entertainment.ImageEntertainments)
    db.Model(&entertainmentTickets[i]).Related(&entertainmentTickets[i].Entertainment).
      Model(&entertainmentTickets[i].Entertainment).Related(&entertainmentTickets[i].Entertainment.City).
      Model(&entertainmentTickets[i].Entertainment.City).Related(&entertainmentTickets[i].Entertainment.City.Region)
  }
  for i:= range entertainmentTickets{
    if entertainmentTickets[i].Entertainment.City.Id == uint(cityId){
      temps= append(temps, entertainmentTickets[i])
    }
  }
  return temps
}

func InsertEntertainmentTicket(Date string, EntertainmentId int, Price float64, DiscountPercentage int)EntertainmentTicket{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()

  d, error := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", Date)
  if error!=nil {
    panic(error)
  }

  db.Create(EntertainmentTicket{
    Date:               d,
    EntertainmentId:    EntertainmentId,
    Price:              Price,
    DiscountPercentage: DiscountPercentage,
  })
  var entertainmentTicket EntertainmentTicket
  db.Last(&entertainmentTicket)
  return entertainmentTicket
}

func DeleteEntertainmentTicket(entertainmentId int)[]EntertainmentTicket{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var entertainmentTickets []EntertainmentTicket

  db.Where("entertainment_id").Find(&entertainmentTickets)

  db.Delete(&entertainmentTickets)

  return entertainmentTickets
}



