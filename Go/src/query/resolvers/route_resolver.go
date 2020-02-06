package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetRoutes(p graphql.ResolveParams)(interface{}, error){
  rows, err:= models.GetRoutes()
  if err!=nil{
    return nil, err
  }

  return rows, nil
}
