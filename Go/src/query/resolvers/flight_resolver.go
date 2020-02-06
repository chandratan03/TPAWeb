package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetFlights(p graphql.ResolveParams)(interface{}, error){
  rows, err:= models.GetFlights()
  if err!=nil{
    return nil, err
  }

  return rows, nil
}
