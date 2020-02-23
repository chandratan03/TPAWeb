package models

import (
  "Connect/database"
  "time"
)


type TrainTrip struct{
  Id uint `gorm:"primary_key"`
  CreatedAt		time.Time
  UpdatedAt		time.Time
  DeletedAt		*time.Time		`sql:index`
  TrainId uint `json:"train_id"`
  Train Train `gorm:"foreignKey: train_id"`
  FromRefer		uint `json:"from_refer"`
  From			Station		`gorm:"foreignKey:from_refer"`
  ToRefer			uint `json:"to_refer"`
  To				Station		`gorm:"foreignKey:to_refer"`
  Departure		time.Time
  Arrival 		time.Time
  Duration		uint
  Price			float64
  Tax				float64
  ServiceCharge	float64
}

func GetTrainTrips()([]TrainTrip, error){
  db, err:= database.Connect()

  if err!=nil {
    panic(err)
  }
  defer db.Close()
  var trainTrips []TrainTrip

  db.Find(&trainTrips)

  for i:= range trainTrips{
    db.Model(&trainTrips[i]).Related(&trainTrips[i].From, "from_refer").
      Model(&trainTrips[i]).Related(&trainTrips[i].To, "to_refer").
      Model(&trainTrips[i].From).Related(&trainTrips[i].From.Area).
      Model(&trainTrips[i].From.Area).Related(&trainTrips[i].From.Area.City).
      Model(&trainTrips[i].From.Area.City).Related(&trainTrips[i].From.Area.City.Region).
      Model(&trainTrips[i].To).Related(&trainTrips[i].To.Area).
      Model(&trainTrips[i].To.Area).Related(&trainTrips[i].To.Area.City).
      Model(&trainTrips[i].To.Area.City).Related(&trainTrips[i].To.Area.City.Region).
      Model(&trainTrips[i]).Related(&trainTrips[i].Train).
      Model(&trainTrips[i].Train).Related(&trainTrips[i].Train.TrainClass).
      Model(&trainTrips[i].Train).Related(&trainTrips[i].Train.TrainType)

  }
  return trainTrips, nil
}


func GetTrainTripsByFromToDate(fromId int, toId int, date string)([]TrainTrip, error){
  db, err:= database.Connect()

  if err!=nil {
    panic(err)
  }
  defer db.Close()
  var trainTrips []TrainTrip

  db.Where("from_refer = ? and to_refer = ? and date(departure) = ?", fromId, toId, date).Find(&trainTrips)
  println(&trainTrips)
  for i:= range trainTrips{
    db.Model(&trainTrips[i]).Related(&trainTrips[i].From, "from_refer").
      Model(&trainTrips[i]).Related(&trainTrips[i].To, "to_refer").
      Model(&trainTrips[i].From).Related(&trainTrips[i].From.Area).
      Model(&trainTrips[i].From.Area).Related(&trainTrips[i].From.Area.City).
      Model(&trainTrips[i].From.Area.City).Related(&trainTrips[i].From.Area.City.Region).
      Model(&trainTrips[i].To).Related(&trainTrips[i].To.Area).
      Model(&trainTrips[i].To.Area).Related(&trainTrips[i].To.Area.City).
      Model(&trainTrips[i].To.Area.City).Related(&trainTrips[i].To.Area.City.Region).
      Model(&trainTrips[i]).Related(&trainTrips[i].Train).
      Model(&trainTrips[i].Train).Related(&trainTrips[i].Train.TrainClass).
      Model(&trainTrips[i].Train).Related(&trainTrips[i].Train.TrainType)
  }
  //println(trainTrips[0].Id)
  return trainTrips, nil
}

//Id uint `gorm:"primary_key"`
//TrainId uint `json:"train_id"`
//FromRefer		uint `json:"from_refer"`
//ToRefer			uint `json:"to_refer"`
//Departure		time.Time
//Arrival 		time.Time
//Duration		uint
//Price			float64
//Tax				float64
//ServiceCharge	float64


func InsertTrainTrip(trainId int, fromRefer int, toRefer int, departure string,arrival string, duration int,
   price float64, tax float64, serviceCharge float64)TrainTrip{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()


  departureTime, error := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", departure)
  if error!=nil{
    panic(error)
  }
  arrivalTime, error := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", arrival)
  if error!=nil{
    panic(error)
  }
  db.Create(&TrainTrip{
    TrainId:       uint(trainId),
    FromRefer:     uint(fromRefer),
    ToRefer:       uint(toRefer),
    Departure:     departureTime,
    Arrival:       arrivalTime,
    Duration:      uint(duration),
    Price:         price,
    Tax:           tax,
    ServiceCharge: serviceCharge,
  })
  var trainTrip TrainTrip
  db.Last(&trainTrip)

  return trainTrip


}

func DeleteTrainTrip(id int)TrainTrip{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()

  var trainTrip TrainTrip
  db.Where("id = ?",id).Find(&trainTrip)

  db.Delete(&trainTrip)
  print(trainTrip.Id)



  return trainTrip
}

func UpdateTrainTrip(id int,trainId int, fromRefer int, toRefer int, departure string,arrival string, duration int,
  price float64, tax float64, serviceCharge float64)TrainTrip{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()


  departureTime, error := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", departure)
  if error!=nil{
    panic(error)
  }
  arrivalTime, error := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", arrival)
  if error!=nil{
    panic(error)
  }
  var TrainTrip TrainTrip

  db.Where("id = ?", id).Find(&TrainTrip)


  TrainTrip.TrainId=       uint(trainId)
  TrainTrip.FromRefer=     uint(fromRefer)
  TrainTrip.ToRefer=       uint(toRefer)
  TrainTrip.Departure=     departureTime
  TrainTrip.Arrival=       arrivalTime
  TrainTrip.Duration=      uint(duration)
  TrainTrip.Price=         price
  TrainTrip.Tax=           tax
  TrainTrip.ServiceCharge= serviceCharge

  db.Save(&TrainTrip)
  return TrainTrip


}


