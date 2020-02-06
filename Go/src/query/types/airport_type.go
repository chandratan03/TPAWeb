package types

import "github.com/graphql-go/graphql"

var airportType *graphql.Object

func GetAirportType() *graphql.Object{
  if airportType == nil{
    airportType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "airportType",
      Fields:     graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "city": &graphql.Field{
            Type:GetCityType(),
        },
      },
    })
  }
  return airportType
}

