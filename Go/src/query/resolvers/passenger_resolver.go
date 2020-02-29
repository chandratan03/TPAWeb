package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetPassengers(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetPassengers()
  return rows, nil
}
