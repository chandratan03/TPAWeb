package models

type Address struct{
  id uint `gorm:primary_key`
  addressName string `json: "address_name" db:"address_name"`
}


