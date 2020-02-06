package types

import (
  "github.com/graphql-go/graphql"
)


var hotelType *graphql.Object
func GetHotelType() *graphql.Object{

  if hotelType == nil{
    hotelType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "hotelType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:  graphql.Int,
        },
        "hotelName": &graphql.Field{
          Type:  graphql.String,
        },
        "price": &graphql.Field{
          Type:  graphql.Float,
        },
        "rate": &graphql.Field{
          Type: graphql.Int,
        },
        "location": &graphql.Field{
            Type:GetLocationType(),
        },
        "address": &graphql.Field{
          Type: graphql.String,
        },
        "hotelFacilities": &graphql.Field{
          Type: graphql.NewList(GetHotelFacilityType()),
        },
        "imagePath": &graphql.Field{
            Type:graphql.String,
        },
        "discountPrice": &graphql.Field{
            Type:graphql.Float,
        },
        "discountPercentage": &graphql.Field{
            Type:graphql.Int,
        },
        "quantity": &graphql.Field{
          Type:graphql.Int,
        },
      },
      Description: "",
    })
  }
  return hotelType

}