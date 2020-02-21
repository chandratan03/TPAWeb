package models

import (
  "Connect/database"
  "time"
)

type Airline struct{
  Id uint `gorm: "primary_key"`
  Name		string
  Path string
  AirlineFacilities []AirlineFacility `gorm:"foreignKey:AirlineId"`
  CreatedAt	time.Time
  UpdatedAt	time.Time
  DeletedAt	*time.Time		`sql:index`
}

func GetAirlines()([]Airline, error){
  db, err :=  database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var airlines []Airline
  db.Find(&airlines)

  for i,_  := range airlines{
    db.Model(&airlines[i]).Related(&airlines[i].AirlineFacilities, "AirlineId")
    for j,_ := range airlines[i].AirlineFacilities{
      db.Model(&airlines[i].AirlineFacilities[j]).Related(&airlines[i].AirlineFacilities[j].Facility)
    }
  }
  println(&airlines)

  return airlines, nil

}
