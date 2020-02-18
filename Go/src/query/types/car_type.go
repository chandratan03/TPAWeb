package types

import "github.com/graphql-go/graphql"

//Id uint `gorm:"primary_key"`
//Price float64
//BrandId uint `json:"brand_id"`
//Brand Brand `gorm:"foreignkey:brand_id"`
//VendorCarId uint `json:"vendor_id"`
//VendorCar Vendor `gorm:"foreignkey:vendor_id"`
//
//Model string
//Capacity int
//Luggage int
//ImagePath string


var carType *graphql.Object


func GetCarType() *graphql.Object{
  if carType == nil{
    carType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "carType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
        },
        "price": &graphql.Field{
            Type:graphql.Float,
        },
        "brand": &graphql.Field{
            Type:GetBrandType(),
        },
        "vendorCars": &graphql.Field{
            Type:graphql.NewList(GetVendorCarType()),
        },
        "model": &graphql.Field{
            Type:graphql.String,
        },
        "capacity": &graphql.Field{
            Type:graphql.Int,
        },
        "luggage": &graphql.Field{
            Type:graphql.Int,
        },
        "imagePath": &graphql.Field{
            Type:graphql.String,
        },


      },
    })
  }
  return carType
}
