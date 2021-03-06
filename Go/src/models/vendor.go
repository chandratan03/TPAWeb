package models

import "time"

type Vendor struct{
  Id uint `gorm:"primary_key"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
  Name string
  ImagePath string
}
