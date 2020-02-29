package models

import (
  "Connect/database"
  "time"
)

type PromoCode struct{
  Id int `gorm :"primary_key"`
  Code string
  DiscountPercentage int
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}

func GetPromos()[]PromoCode{
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var promoCodes []PromoCode
  db.Find(&promoCodes)
  return promoCodes

}
func GetPromoByCode(code string)PromoCode{
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var promoCode PromoCode
  db.Where("code = ?", code).Find(&promoCode)
  return promoCode
}

func DeletePromoByCode(code string)PromoCode{
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var promoCode PromoCode
  db.Where("code = ?", code).Find(&promoCode)
  db.Delete(&promoCode)
  return promoCode
}
