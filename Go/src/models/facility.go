package models

import "Connect/database"

type Facility struct {
  Id uint `gorm:"primary_key"`
  Name string `json:"name"`
  ImagePath string `json:"image_path"`
  ForObject string
}


func GetFacilities()([]Facility,error){
  db, err := database.Connect()

  if err!=nil {
    panic(err)
  }

  var facilities []Facility
  db.Find(&facilities)
  ////////////////////////////////////
  //test for raw query
  //rows, err := db.Raw("Select * from facilities").Rows()
  //for rows.Next(){
  //   var facility Facility
  //   db.ScanRows(rows, &facility)
  //   facilities =  append(facilities, facility)
  //}
  //print(facilities)
  //print(facilities[0].Name)
  ////////////////////////////
  if err!=nil{
    return nil, nil
  }
  print(facilities[0].Name)

  return facilities, nil
}

func GetFacilitiesByForObject(forObject string)([]Facility,error){
  db, err := database.Connect()

  if err!=nil {
    panic(err)
  }

  var facilities []Facility
  db.Where("for_object = ?", forObject).Find(&facilities)
  ////////////////////////////////////
  //test for raw query
  //rows, err := db.Raw("Select * from facilities").Rows()
  //for rows.Next(){
  //   var facility Facility
  //   db.ScanRows(rows, &facility)
  //   facilities =  append(facilities, facility)
  //}
  //print(facilities)
  //print(facilities[0].Name)
  ////////////////////////////
  if err!=nil{
    return nil, nil
  }
  print(facilities[0].Name)

  return facilities, nil
}

func GetFacilityByID(id uint)(Facility, error){
  db, err := database.Connect()
  if err!=nil {
    panic(err)
  }
  var facility Facility
  db.Where("id = ?", id).First(&facility)
  return facility,nil
}




