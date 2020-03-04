package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetEntertainments(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetEntertainments()
  return rows, nil
}


func GetEntertainmentById(params graphql.ResolveParams)(interface{}, error){
  id := params.Args["id"].(int)
  row := models.GetEntertainmentById(id)
  return row, nil
}
