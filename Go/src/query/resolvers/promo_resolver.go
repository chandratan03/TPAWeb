package resolvers

import (
"github.com/graphql-go/graphql"
"models"
)

func GetPromos(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetPromos()
  return rows, nil
}

func GetLatestPromo(params graphql.ResolveParams)(interface{}, error){
  row:= models.GetLatestPromo()
  return row,nil
}
