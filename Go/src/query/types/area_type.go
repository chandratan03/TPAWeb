package types

import (
  "github.com/graphql-go/graphql"
)

var areaType *graphql.Object


func GetAreaType()*graphql.Object{
  if areaType== nil{
    areaType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "areaType",
      Fields:      graphql.Fields{
          "id" : &graphql.Field{
            Type:graphql.Int,
          },
          "areaName": &graphql.Field{
            Type:graphql.String,
          },
          "city": &graphql.Field{
            Type:GetCityType(),
          },
      },
      Description: "get ARea type",
    })

  }
  return areaType
}
