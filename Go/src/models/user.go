package models

import "github.com/jinzhu/gorm"

type user struct {
  gorm.Model
  Id int32 `json:"id" db:"id"`
  name string `json:"name" db:"name"`
}
