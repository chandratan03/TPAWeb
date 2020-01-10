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
          Type:  graphql.Int,
        },
        "rate": &graphql.Field{
          Type:  graphql.Int,
        },
        "availableDates": &graphql.Field{
          Type:  graphql.NewList(GetAvailableForHotelType()),
        },

      },
      Description: "",
    })
  }
  return hotelType

}
