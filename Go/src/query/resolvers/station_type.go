package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetStations(params graphql.ResolveParams)(interface{}, error){
  rows, err := models.GetStations()

  if err!=nil{
    panic(err)
  }

  return rows,nil

}



