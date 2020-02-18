package models

import "time"

type VendorCar struct {
  Id uint `gorm:"primary_key"`
  CarId uint
  VendorId uint `json:"vendor_id"`
  Vendor Vendor `gorm:"foreignkey:vendor_id"`
  Price float64
  AreaId int `json:"area_id"`
  Area Area `gorm:"foreignkey:area_id"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
}





