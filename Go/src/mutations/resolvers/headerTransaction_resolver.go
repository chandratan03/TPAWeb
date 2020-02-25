package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertHeaderTransaction(params graphql.ResolveParams)(interface{}, error){
  userId:= params.Args["userId"].(int)
  row := models.InsertHeaderTransaction(userId)
  return row, nil
}

