package models

import (
  "Connect/database"
  "time"
)

type Airline struct{
  Id uint `gorm: "primary_key"`
  Name		string
  Path string
  CreatedAt	time.Time
  UpdatedAt	time.Time
  DeletedAt	*time.Time		`sql:index`
}

func GetAirlines()([]Airline, error){
  db, err :=  database.Connect()
  if err!=nil{
    panic(err)
  }

  var airlines []Airline
  db.Find(&airlines)

  return airlines, nil

}
