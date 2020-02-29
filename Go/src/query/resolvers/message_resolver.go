package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetAllMessages(params graphql.ResolveParams)(interface{}, error){
    rows := models.GetAllMessages()
    return rows, nil
}


func GetAllMessagesBySenderAndReceiver(params graphql.ResolveParams)(interface{}, error){
  from:= params.Args["from"].(int)
  to:= params.Args["to"].(int)
  rows := models.GetAllMessagesBySenderAndReceiver(from,to)
  return rows, nil
}

