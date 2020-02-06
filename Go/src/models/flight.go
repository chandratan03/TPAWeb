package models

import (
  "Connect/database"
  "time"
)

type Flight struct {
  Id				int			`gorm:"primary_key" `
  Airline 		Airline		`gorm:"foreignKey:airline_refer"`
  AirlineRefer	uint `json:"airline_refer"`
  Routes			[]Route `gorm:"foreignKey:route_id"`
  Transit int
  From			Airport		`gorm:"foreignKey:from_refer"`
  FromRefer		uint
  To				Airport		`gorm:"foreignKey:to_refer"`
  ToRefer			uint
  Departure		time.Time
  Arrival 		time.Time
  Duration		uint
  Price			int
  Tax				int
  ServiceCharge	int
  CreatedAt		time.Time
  UpdatedAt		time.Time
  DeletedAt		*time.Time		`sql:index`
}


func GetFlights()([]Flight, error){
  db,err := database.Connect()
  if err != nil{
    return nil, err
  }
  var flights []Flight

  db.Find(&flights)
  for i:= range flights{
    db.Model(&flights[i]).Related(&flights[i].From, "from_refer").
      Model(&flights[i]).Related(&flights[i].To, "to_refer").Model(&flights[i]).
      Related(&flights[i].Airline, "airline_refer").Model(&flights[i]).Related(&flights[i].Routes, "route_id").
      Model(&flights[i].To).Related(&flights[i].To.City, "city_id").
      Model(&flights[i].From).Related(&flights[i].From.City, "city_id").
      Model(&flights[i].From.City).Related(&flights[i].From.City.Region, "region_id").
      Model(&flights[i].To.City).Related(&flights[i].To.City.Region, "region_id")

    for j:=range flights[i].Routes{
      db.Model(&flights[i].Routes[j]).Related(&flights[i].Routes[j].From, "from_refer").Model(&flights[i].Routes[j]).
        Related(&flights[i].Routes[j].To, "to_refer").Model(&flights[i].Routes[j].To).
        Model(&flights[i].Routes[j].To).Related(&flights[i].Routes[j].To.City, "city_id").Model(&flights[i].Routes[j].From).
        Related(&flights[i].Routes[j].From.City, "city_id").
        Model(&flights[i].Routes[j].From.City).Related(&flights[i].Routes[j].From.City.Region, "region_id").
        Model(&flights[i].Routes[j].To.City).Related(&flights[i].Routes[j].To.City.Region, "region_id")
        //Model()
      print(flights[i].Routes[j].To.Name , flights[i].Routes[j].From.Name)
    }



  }
  return flights, nil
}


