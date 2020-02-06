package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetAirlines(p graphql.ResolveParams)(interface{}, error){
  rows, err:= models.GetAirlines()
  if err!=nil{
    return nil, err
  }

  return rows, nil
}
