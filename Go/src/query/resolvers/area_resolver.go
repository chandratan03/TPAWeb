package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetAreas(params graphql.ResolveParams)(interface{}, error){
  rows, err := models.GetAreas()
  if err!=nil{
    panic(rows)
  }
  return rows, nil

}
