package models

import "Connect/database"

type AirlineFacility struct{
  Id uint `gorm: "primary_key"`
  AirlineId uint
  FacilityId uint `json:"facility_id"`
  Facility Facility `gorm:"foreignkey"`
}
func GetAirlineFacilities()([]AirlineFacility,error){
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var airlineFacilities[] AirlineFacility
  db.Find(&airlineFacilities)
  return airlineFacilities,nil
}


func GetAirlineFacilitiesByHotelId(id uint) []AirlineFacility{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var airlineFacilities[] AirlineFacility

  //rows, err:= db.Where("id", id).Rows()
  //for rows.Next(){
  // var temp HotelFacility
  // db.ScanRows(rows, &temp)
  // hotelFacilities = append(hotelFacilities, temp)
  //}
  db.Where("id = ?", id).Find(&airlineFacilities)
  println(airlineFacilities[0].Id)
  return airlineFacilities
}






