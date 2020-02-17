package types

import "github.com/graphql-go/graphql"

var stationType *graphql.Object

func GetStationType() *graphql.Object{
  if stationType == nil{
    stationType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "stationType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "stationCode": &graphql.Field{
          Type:graphql.String,
        },
        "area": &graphql.Field{
          Type:GetAreaType(),
        },
      },
    })
  }
  return stationType

}
