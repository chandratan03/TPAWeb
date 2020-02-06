package types

import "github.com/graphql-go/graphql"

var hotelFacilityType *graphql.Object


func GetHotelFacilityType() *graphql.Object{
  if hotelFacilityType == nil {
    hotelFacilityType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "HotelFacilityType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
        },
        "hotelId": &graphql.Field{
            Type:graphql.Int,
        },
        "facility": &graphql.Field{
          Type: GetFacilityType(),
      },

      },

    })
  }

  return hotelFacilityType
}
