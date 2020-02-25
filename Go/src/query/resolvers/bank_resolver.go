package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetBanks(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetBanks()
  return rows, nil
}
