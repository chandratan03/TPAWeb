package models

import (
  "Connect/database"
  "time"
)

type Route struct{
  Id				int	`gorm:primary_key`
  //Flight Flight `gorm: "foreignKey"`
  FlightId uint `json: "flight_Id"`
  From      Airport `gorm:"foreignKey:from_refer"`
  FromRefer uint `json:"from_refer"`
  To				Airport `gorm:"foreignKey:to_refer"'`
  ToRefer uint `json:"to_refer"`
  CreatedAt		time.Time
  UpdatedAt		time.Time
  DeletedAt		*time.Time		`sql:index`
}

func GetRoutes()([]Route, error){
  db, err := database.Connect()
  if err!= nil{
    panic(err)
  }
  var routes[] Route
  db.Find(&routes)
  for i, _:= range routes {
   db.Model(&routes[i]).Related(&routes[i].From, "from_refer").Model(&routes[i]).Related(&routes[i].To, "to_refer")
    //println(routes[i].Id)
  }
  //print(routes)
  return routes, nil
}




