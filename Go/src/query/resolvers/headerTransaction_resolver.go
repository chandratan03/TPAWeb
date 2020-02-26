package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetHeaderTransations(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetHeaderTransctions()
  return rows ,nil
}

func GetHeaderTransactionByUserId(params graphql.ResolveParams)(interface{}, error){
  userId := params.Args["userId"].(int)
  rows := models.GetHeaderTransactionByUserId(userId)
  return rows,nil
}


