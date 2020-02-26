package database

import (
  "fmt"
  "github.com/jinzhu/gorm"
)
const (
  host     = "127.0.0.1"
  port     = 5432
  user     = "postgres"
  password = "admin"
  dbname   = "TPA"
)

//var num int
//var once sync.Once
//
//func Connect() (*gorm.DB, error){
//  var e error
//  once.Do(func(){
//    sqlInfo:=fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
//    db,error:= gorm.Open("postgres", sqlInfo)
//    if error!=nil{panic(error)}
//    fmt.Print(db)
//  })
//  return db, e
//}
func Connect()(*gorm.DB, error){


  //fmt.Println(db)
  sqlInfo:=fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
  db,error:= gorm.Open("postgres", sqlInfo)

  if error!=nil{panic(error)}
  //fmt.Println(num, db)
  return db, nil
}




