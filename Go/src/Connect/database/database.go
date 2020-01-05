package database

import (
  "fmt"
  "github.com/jinzhu/gorm"
)
const (
  host     = "167.71.168.135"
  port     = 5432
  user     = "CT"
  password = "CTCTCT"
  dbname   = "CT"
)

func Connect()(*gorm.DB, error){
  sqlInfo:=fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
  db,error:= gorm.Open("postgres", sqlInfo)
  if error!=nil{panic(error)}
  return db, error
}


