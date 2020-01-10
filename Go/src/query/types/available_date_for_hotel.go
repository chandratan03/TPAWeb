package types

import "github.com/graphql-go/graphql"

var availableForHotelType *graphql.Object


func  GetAvailableForHotelType() *graphql.Object{
  if availableForHotelType == nil {
    availableForHotelType = graphql.NewObject(graphql.ObjectConfig{
      Name: "AvailableForHotelType",
      Fields: graphql.Fields{
        "dateId": &graphql.Field{
          Type: graphql.Int,
        },
        "date": &graphql.Field{
            Type:graphql.DateTime,
        },
        "isAvailable": &graphql.Field{
          Type:  graphql.Boolean,
        },
        "hotelID" : &graphql.Field{
          Type: graphql.Int,
        },
      },
    })



  }
  return availableForHotelType


}
