package types

import "github.com/graphql-go/graphql"

var passengerType *graphql.Object

func GetPassengerType() *graphql.Object{
  if passengerType == nil{
    passengerType = graphql.NewObject(graphql.ObjectConfig{
      Name: "PassengerType",
      Fields:      graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.String,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "title": &graphql.Field{
          Type: graphql.String,
        },
        "nationality": &graphql.Field{
          Type:graphql.String,
        },
      },
    })
  }
  return passengerType
}
