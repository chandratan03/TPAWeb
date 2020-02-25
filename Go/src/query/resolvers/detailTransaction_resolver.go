package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetDetailTransactions(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetDetailTransactions()
  return rows, nil

}


