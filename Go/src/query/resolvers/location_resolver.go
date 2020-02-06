package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetLocations(params graphql.ResolveParams)(interface{}, error){
  rows, err :=  models.GetLocations()
  if err != nil {
    return nil, err
  }
  return rows, nil
}
