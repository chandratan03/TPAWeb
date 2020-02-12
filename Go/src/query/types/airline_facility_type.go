package types

import "github.com/graphql-go/graphql"

var airlineFacilityType *graphql.Object



func GetAirlineFacilityType() *graphql.Object{
  if airlineFacilityType == nil{
    airlineFacilityType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "airlineFacilityType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
        },
        "airlineId": &graphql.Field{
          Type: graphql.Int,
        },
        "facility": &graphql.Field{
          Type: GetFacilityType(),
        },


      },
      Description: "Get AirlineFacilityType",
    })


  }


  return airlineFacilityType
}
