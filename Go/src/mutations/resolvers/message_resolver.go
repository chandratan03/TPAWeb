package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertMessage(params graphql.ResolveParams)(interface{}, error){
  from:= params.Args["from"].(int)
  to:= params.Args["to"].(int)
  message:= params.Args["message"].(string)
  rows := models.InsertMessage(from,to, message)

  return rows, nil
}
