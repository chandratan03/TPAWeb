package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetAirports(p graphql.ResolveParams)(interface{}, error){
  rows, err:= models.GetAirports()
  if err!=nil{
    return nil, err
  }

  return rows, nil
}
