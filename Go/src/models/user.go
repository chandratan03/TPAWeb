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
  Nationality string
  Address string
  CityId int `json:"city_id"`
  City City `gorm:"ForeingKey:city_id"`
  PostCode string
  Gender string
  EmailVerified bool
  PhoneVerified bool
}


func GetUsers()  ([]User, error){
  db, err := database.Connect()

  if err!=nil{
    return nil, err
  }
  defer db.Close()
  var users []User
  db.Find(&users)

  return users, nil
}

func GetUser(userId uint)([]User, error){
  db,err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var user []User
  db.Where(&User{
   ID:userId,
  }).First(&user)

  for i:= range user{
    db.Model(&user[i]).Related(&user[i].City).
      Model(&user[i].City).Related(&user[i].City.Region)
  }

  //fmt.Print((user).ID)
  return user, nil
}

func GetUserByEmail(email string)(i interface{}, e error){
    db, err := database.Connect()
    if err!=nil{
      panic(err)
    }
    var user User
  defer db.Close()
    db.Where("email = ?", email).First(&user)

  db.Model(&user).Related(&user.City).
      Model(&user.City).Related(&user.City.Region)
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
  defer db.Close()
  var user User
  db.Where("email = ? and password = ? ", email, password).Or("phone_number=? and password = ?", email,password).First(&user)
  //fmt.Print(()
  fmt.Println(user)
  db.Model(&user).Related(&user.City).
    Model(&user.City).Related(&user.City.Region)

  //fmt.Print("hallo")
  return user, nil

}


func CreateUser(firstName string, lastName string, password string,  email string, phoneNumber string, nationality string)(i interface{},e error){
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
    Nationality:nationality,
    // tembak manual, 1 itu jakarta
    CityId: 1,
  })

  var user User
  db.Last(&user)
  return &user, nil
}


func UpdateUserById(id int, firstName string,
  lastName string,email string,
  phoneNumber string, nationality string,
  address string, cityId int, postCode string,
  gender string)User{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }

  defer db.Close()
  var  user  User
  db.Where("id = ?", id).Find(&user)
  user.FirstName = firstName
  user.LastName = lastName
  user.Email = email
  user.PhoneNumber = phoneNumber
  user.Nationality = nationality
  user.Address = address
  user.CityId = cityId
  user.PostCode = postCode
  user.Gender = gender
  db.Save(&user)

  return user
}


func UpdateVerifyPhone(id int)User{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var  user  User
  db.Where("id = ?", id).Find(&user)

  user.PhoneVerified = true
  db.Save(&user)
  return user

}



func UpdateVerifyEmail(id int)User{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()

  var  user  User
  db.Where("id = ?", id).Find(&user)

  user.EmailVerified= true
  db.Save(&user)
  return user

}
