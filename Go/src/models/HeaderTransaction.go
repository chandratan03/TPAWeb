package models

import (
  "Connect/database"
  "time"
)

type HeaderTransaction  struct{
  Id int `gorm:"primary_key"`
  UserId int `json:"user_id"`
  User User `gorm:"foreignKey:user_id"`
  DetailTransactions []DetailTransaction
  Date time.Time
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetHeaderTransctions()[]HeaderTransaction {
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var headerTransactions []HeaderTransaction
  db.Find(&headerTransactions)
  for i := range headerTransactions{
    db.Where("header_id = ?", headerTransactions[i].Id).Find(&headerTransactions[i].DetailTransactions)
    for j := range headerTransactions[i].DetailTransactions{
      db.Model(&headerTransactions[i].DetailTransactions[j]).Related(&headerTransactions[i].DetailTransactions[j].Flight).
        Model(&headerTransactions[i].DetailTransactions[j].Flight).Related(&headerTransactions[i].DetailTransactions[j].Flight.From).
        Model(&headerTransactions[i].DetailTransactions[j].Flight).Related(&headerTransactions[i].DetailTransactions[j].Flight.To)
    }
  }
  return headerTransactions
}


func GetHeaderTransactionByUserId(userId int)[]HeaderTransaction {
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()

  var headerTransactions []HeaderTransaction
  db.Where("user_id = ?", userId).Find(&headerTransactions)

  for i := range headerTransactions{
    db.Where("header_id = ?", headerTransactions[i].Id).Find(&headerTransactions[i].DetailTransactions)
    for j := range headerTransactions[i].DetailTransactions{
      db.Model(&headerTransactions[i].DetailTransactions[j]).Related(&headerTransactions[i].DetailTransactions[j].Flight).
        Model(&headerTransactions[i].DetailTransactions[j].Flight).Related(&headerTransactions[i].DetailTransactions[j].Flight.From).
        Model(&headerTransactions[i].DetailTransactions[j].Flight).Related(&headerTransactions[i].DetailTransactions[j].Flight.To)
    }
  }
  return headerTransactions
}

//Id int `gorm:"primary_key"`
//UserId int `json:"user_id"`
//User User `gorm:"foreignKey:user_id"`
//DetailTransactions []DetailTransaction
//Date time.Time
func InsertHeaderTransaction(userId int)HeaderTransaction{
  //date by time.now() aja
  db, error := database.Connect()
  if error!=nil{
    panic(error)
  }
  defer db.Close()
  db.Create(&HeaderTransaction{
    UserId:             userId,
    Date:               time.Now(),
  })
  var ht HeaderTransaction
  db.Last(&ht)
  return ht
}



