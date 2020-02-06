package types


import (
  "github.com/graphql-go/graphql"
)

var routeType *graphql.Object

func GetRouteType() *graphql.Object{
  if routeType == nil{
    routeType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "routeType",
      Fields:     graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "from": &graphql.Field{
          Type:GetAirportType(),
        },
        "to": &graphql.Field{
          Type:GetAirportType(),
        },

      },
    })
  }
  return routeType
}






