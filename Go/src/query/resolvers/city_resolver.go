package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetCities(p graphql.ResolveParams) (i interface{}, err error){
  rows, err:= models.GetCities()
  if err!=nil{
    return nil, err
  }

  return rows, nil
}
