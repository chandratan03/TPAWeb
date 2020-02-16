package models

import "Connect/database"

type HotelFacility struct{
  Id uint `gorm:"primary_key"`
  HotelId uint
  FacilityId uint `json:"facility_id"`
  Facility Facility `gorm:"foreignkey"`
}
func GetHotelFacilities()([]HotelFacility,error){
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var hotelFacilities[] HotelFacility
  db.Find(&hotelFacilities)
  defer db.Close()
  return hotelFacilities,nil


}


func GetHotelFacilitiesByHotelId(id uint) []HotelFacility{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var hotelFacilities[] HotelFacility
  defer db.Close()
  //rows, err:= db.Where("id", id).Rows()
  //for rows.Next(){
  // var temp HotelFacility
  // db.ScanRows(rows, &temp)
  // hotelFacilities = append(hotelFacilities, temp)
  //}
  db.Where("id = ?", id).Find(&hotelFacilities)
  println(hotelFacilities[0].Id)
  return hotelFacilities
}





