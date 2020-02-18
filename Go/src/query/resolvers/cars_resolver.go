package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetCars(params graphql.ResolveParams)(interface{}, error){
  rows, err := models.GetCars()
  if err !=nil{
    panic(err)
  }
  return rows, nil
}
