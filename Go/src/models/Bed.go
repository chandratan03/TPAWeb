package models



type Bed struct{
  Id uint `gorm:"primary_key"`
  BedName string
}
