package types

import (
  "github.com/graphql-go/graphql"
)

var flightType *graphql.Object

func GetFlightType() *graphql.Object{
  if flightType == nil{
    flightType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "flightType",
      Fields:     graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "airline": &graphql.Field{
          Type:GetAirlineType(),
        },
        "routes": &graphql.Field{
            Type:graphql.NewList(GetRouteType()),
        },
        "from": &graphql.Field{
          Type:GetAirportType(),
        },
        "to": &graphql.Field{
          Type:GetAirportType(),
        },
        "departure": &graphql.Field{
            Type:graphql.DateTime,
        },
        "arrival": &graphql.Field{
          Type:graphql.DateTime,
        },
        "duration": &graphql.Field{
          Type:graphql.Int,
        },
        "price": &graphql.Field{
          Type:graphql.Int,
        },
        "tax": &graphql.Field{
          Type:graphql.Int,
        },

      },
    })
  }
  return flightType
}





