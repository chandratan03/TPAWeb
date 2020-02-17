package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetTrains(params graphql.ResolveParams)(interface{}, error){
  rows, error := models.GetTrains()
  if error!=nil{
    panic(error)
  }
  return rows,nil
}

