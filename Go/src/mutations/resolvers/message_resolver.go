package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertMessage(params graphql.ResolveParams)(interface{}, error){
  from:= params.Args["from"].(int)
  to:= params.Args["to"].(int)
  var message string
  var image string
  image = ""
  message =""
  if params.Args["message"] !=nil{
    message= params.Args["message"].(string)
  }
  if  params.Args["image"] !=nil{
    image = params.Args["image"].(string)
  }
  rows := models.InsertMessage(from,to, message, image)

  return rows, nil
}
