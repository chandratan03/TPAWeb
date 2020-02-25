package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetCarts(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetCarts()
  return rows, nil
}

func GetCartsByUserId(params graphql.ResolveParams)(interface{}, error){
  userId := params.Args["userId"].(int)
  rows := models.GetCartsByUserId(userId)
  return rows, nil
}
