package models

import (
  "Connect/database"
  "fmt"
  "time"
)
type User struct {
  //gorm.Model
  ID        uint `gorm:"primary_key"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
  FirstName string `json:"first_name" db:"first_name"`
  LastName string `json:"last_name" db:"last_name"`
  Email string `json:"email" db:"email" gorm:"unique"`
  Password string `json:"password" db:"password"`
  PhoneNumber string `json:"phonenumber" db:"phonenumber"`
}


func GetUsers()  ([]User, error){
  db, err := database.Connect()

  if err!=nil{
    return nil, err
  }

  var users []User
  db.Find(&users)

  return users, nil
}

func GetUser(userId uint)([]User, error){
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

func GetUserByEmail(email string)(i interface{}, e error){
    db, err := database.Connect()
    if err!=nil{
      panic(err)
    }
    var user User
    db.Where("email = ?", email).First(&user)
    //fmt.Print(()
    fmt.Println(user)
    //fmt.Print("hallo")
    return user, nil

}

func GetUserByEmailAndPassword(email string, password string)(i interface{}, e error){
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  var user User
  db.Where("email = ? and password = ? ", email, password).Or("phone_number=? and password = ?", email,password).First(&user)
  //fmt.Print(()
  fmt.Println(user)
  //fmt.Print("hallo")
  return user, nil

}


func CreateUser(firstName string, lastName string, password string,  email string, phoneNumber string)(i interface{},e error){
  db, err := database.Connect()
  if err!=nil{
    return nil, err
  }
  defer db.Close()
  db.Create(&User{
    CreatedAt:   time.Time{},
    UpdatedAt:   time.Time{},
    DeletedAt:   nil,
    FirstName:   firstName,
    LastName:    lastName,
    Email:       email,
    Password:    password,
    PhoneNumber: phoneNumber,
  })

  var user User
  db.Last(&user)
  return &user, nil
}




