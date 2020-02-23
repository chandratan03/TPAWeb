package models

import (
  "Connect/database"
  "time"
)

type HotelTicket struct{
  Id uint `gorm:"primary_key"`
  HotelId uint `json:"hotel_id" gorm:"primary_key;auto_increment:false" `
  Hotel Hotel `gorm:"foreingKey:hotel_id"`
  Date time.Time
  Quantity int
  Price float64
  CreatedAt		time.Time
  UpdatedAt		time.Time
  DeletedAt		*time.Time		`sql:index`
}


func GetHotelTickets()[]HotelTicket{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }

  defer db.Close()

  var hotelTickets []HotelTicket
  db.Find(&hotelTickets)

  for a:= range hotelTickets{
    db.Model(&hotelTickets[a]).Related(&hotelTickets[a].Hotel)
    db.Model(&hotelTickets[a].Hotel).
      Related(&hotelTickets[a].Hotel.City).Model(&hotelTickets[a].Hotel.City).Related(&hotelTickets[a].Hotel.City.Region).
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelFacilities, "HotelId").
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelRooms, "hotel_id").
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Ratings).
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Area, "area_id").
      Model(&hotelTickets[a].Hotel.Area).Related(&hotelTickets[a].Hotel.Area.City).
      Model(&hotelTickets[a].Hotel.Area.City).Related(&hotelTickets[a].Hotel.Area.City.Region)
    //println(hotel.Facilities[0].HotelId)
    for j, _ := range hotelTickets[a].Hotel.HotelFacilities{
      db.Model(&hotelTickets[a].Hotel.HotelFacilities[j]).Related(&hotelTickets[a].Hotel.HotelFacilities[j].Facility, "facility_id")
      //println(hotel.HotelFacilities[j].Facility.Name)
    }
    for j, _ := range hotelTickets[a].Hotel.HotelRooms{
      db.Model(&hotelTickets[a].Hotel.HotelRooms[j]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds, "hotel_room_id")
      for k, _:= range hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds{
        db.Model(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k].Bed)
      }
    }
    hotelTickets[a].Quantity = int(hotelTickets[a].Hotel.Quantity)
  }

  return hotelTickets
}

func GetHotelTicketsByDate(date string)[]HotelTicket{
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }

  defer db.Close()

  var hotelTickets []HotelTicket

  dateTime, err := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", date)
  if err!=nil{
    panic(err)
  }

  db.Where("date(date) = date(?)", dateTime).Find(&hotelTickets)
  for a:= range hotelTickets{
    db.Model(&hotelTickets[a]).Related(&hotelTickets[a].Hotel)
    db.Model(&hotelTickets[a].Hotel).
      Related(&hotelTickets[a].Hotel.City).Model(&hotelTickets[a].Hotel.City).Related(&hotelTickets[a].Hotel.City.Region).
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelFacilities, "HotelId").
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelRooms, "hotel_id").
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Ratings).
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Area, "area_id").
      Model(&hotelTickets[a].Hotel.Area).Related(&hotelTickets[a].Hotel.Area.City).
      Model(&hotelTickets[a].Hotel.Area.City).Related(&hotelTickets[a].Hotel.Area.City.Region)
    //println(hotel.Facilities[0].HotelId)
    for j, _ := range hotelTickets[a].Hotel.HotelFacilities{
      db.Model(&hotelTickets[a].Hotel.HotelFacilities[j]).Related(&hotelTickets[a].Hotel.HotelFacilities[j].Facility, "facility_id")
      //println(hotel.HotelFacilities[j].Facility.Name)
    }
    for j, _ := range hotelTickets[a].Hotel.HotelRooms{
      db.Model(&hotelTickets[a].Hotel.HotelRooms[j]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds, "hotel_room_id")
      for k, _:= range hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds{
        db.Model(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k].Bed)
      }
    }
    hotelTickets[a].Quantity = int(hotelTickets[a].Hotel.Quantity)
  }

  return hotelTickets
}
//func GetHotelTicketsByCityIdAndDate(id int,date string)[]HotelTicket{
//  db, error := database.Connect()
//  if error!=nil{
//    panic(error)
//  }
//
//  defer db.Close()
//
//  var hotelTickets []HotelTicket
//
//  dateTime, err := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", date)
//  if err!=nil{
//    panic(err)
//  }
//
//  db.Where("id=? AND date(date) = date(?)", id,dateTime).Find(&hotelTickets)
//  for a:= range hotelTickets{
//    db.Model(&hotelTickets[a]).Related(&hotelTickets[a].Hotel)
//    db.Model(&hotelTickets[a].Hotel).
//      Related(&hotelTickets[a].Hotel.City).Model(&hotelTickets[a].Hotel.City).Related(&hotelTickets[a].Hotel.City.Region).
//      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelFacilities, "HotelId").
//      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelRooms, "hotel_id").
//      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Ratings).
//      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Area, "area_id").
//      Model(&hotelTickets[a].Hotel.Area).Related(&hotelTickets[a].Hotel.Area.City).
//      Model(&hotelTickets[a].Hotel.Area.City).Related(&hotelTickets[a].Hotel.Area.City.Region)
//    //println(hotel.Facilities[0].HotelId)
//    for j, _ := range hotelTickets[a].Hotel.HotelFacilities{
//      db.Model(&hotelTickets[a].Hotel.HotelFacilities[j]).Related(&hotelTickets[a].Hotel.HotelFacilities[j].Facility, "facility_id")
//      //println(hotel.HotelFacilities[j].Facility.Name)
//    }
//    for j, _ := range hotelTickets[a].Hotel.HotelRooms{
//      db.Model(&hotelTickets[a].Hotel.HotelRooms[j]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds, "hotel_room_id")
//      for k, _:= range hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds{
//        db.Model(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k].Bed)
//      }
//    }
//    hotelTickets[a].Quantity = int(hotelTickets[a].Hotel.Quantity)
//  }
//
//  return hotelTickets
//}

func GetHotelTicketById(id int)[]HotelTicket{

  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }

  defer db.Close()

  var hotelTickets []HotelTicket
  db.Where("id = ?", id).Find(&hotelTickets)

  for a:= range hotelTickets{
    db.Model(&hotelTickets[a]).Related(&hotelTickets[a].Hotel)
    db.Model(&hotelTickets[a].Hotel).
      Related(&hotelTickets[a].Hotel.City).Model(&hotelTickets[a].Hotel.City).Related(&hotelTickets[a].Hotel.City.Region).
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelFacilities, "HotelId").
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.HotelRooms, "hotel_id").
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Ratings).
      Model(&hotelTickets[a].Hotel).Related(&hotelTickets[a].Hotel.Area, "area_id").
      Model(&hotelTickets[a].Hotel.Area).Related(&hotelTickets[a].Hotel.Area.City).
      Model(&hotelTickets[a].Hotel.Area.City).Related(&hotelTickets[a].Hotel.Area.City.Region)
    //println(hotel.Facilities[0].HotelId)
    for j, _ := range hotelTickets[a].Hotel.HotelFacilities{
      db.Model(&hotelTickets[a].Hotel.HotelFacilities[j]).Related(&hotelTickets[a].Hotel.HotelFacilities[j].Facility, "facility_id")
      //println(hotel.HotelFacilities[j].Facility.Name)
    }
    for j, _ := range hotelTickets[a].Hotel.HotelRooms{
      db.Model(&hotelTickets[a].Hotel.HotelRooms[j]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds, "hotel_room_id")
      for k, _:= range hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds{
        db.Model(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k]).Related(&hotelTickets[a].Hotel.HotelRooms[j].HotelRoomBeds[k].Bed)
      }
    }
    hotelTickets[a].Quantity = int(hotelTickets[a].Hotel.Quantity)
  }

  return hotelTickets
}

func InsertHotelTicket(hotelId int, date string, quantity int, price float64)(HotelTicket, error){
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()
  var hotelTicket HotelTicket
  dateTime, err := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", date)
  if err!=nil{
    panic(err)
  }

  if db.Where("date(date) = date(?) AND hotel_id = ?", dateTime, hotelId).Find(&hotelTicket).RecordNotFound(){
    db.Create(&HotelTicket{
      HotelId:   uint(hotelId),
      Date:      dateTime,
      Quantity:  quantity,
      Price:     price,
    })
  }else{
    return hotelTicket, nil
  }

  db.Last(&hotelTicket)
  return hotelTicket, nil

}

func UpdateHotelTicket(id int,hotelId int, date string, quantity int, price float64)(HotelTicket, error){
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()
  var hotelTicket HotelTicket
  dateTime, err := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (Western Indonesia Time)", date)
  if err!=nil{
    panic(err)
  }
  db.Where("id = ?", id).Find(&hotelTicket)
  print(hotelTicket.Id)
  hotelTicket.HotelId=   uint(hotelId)
  hotelTicket.Date=      dateTime
  hotelTicket.Quantity=  quantity
  hotelTicket.Price=     price
  db.Save(&hotelTicket)
  return hotelTicket, nil
}


func DeleteHotelTicket(id int)HotelTicket{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()

  var hotelTicket HotelTicket
  db.Where("id = ?",id).Find(&hotelTicket)

  db.Delete(&hotelTicket)
  print(hotelTicket.Id)



  return hotelTicket
}

