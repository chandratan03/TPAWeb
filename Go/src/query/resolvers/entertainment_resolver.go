package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetEntertainments(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetEntertainments()
  return rows, nil
}
