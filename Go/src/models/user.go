package models

import (
  "Connect/database"
  "time"
)
type User struct {
  //gorm.Model
  ID        uint `gorm:"primary_key"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
  Name string `json:"name" db:"name"`
  Password string `json:"password" db:"password"`
  PhoneNumber string `json:"phonenumber" db:"phonenumber"`
}


func GetAll()  ([]User, error){
  db, err := database.Connect()

  if(err!=nil){
    return nil, err
  }

  var users []User
  db.Find(&users)

  return users, nil
}

func Get(userId uint)([]User, error){
  db,err := database.Connect()
  if err!=nil{
    panic(err)
  }

  var user []User
  db.Where(&User{
   ID:userId,
  }).First(&user)
  //fmt.Print((user).ID)
  return user, nil
}

func CreateUser(name string)(i interface{},e error){
  db, err := database.Connect()
  if err!=nil{
    return nil, err
  }
  defer db.Close()

  db.Create(&User{Name:name})

  var user User
  db.Last(&user)
  return &user, nil
}




