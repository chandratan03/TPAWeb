package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func CreateUser(params graphql.ResolveParams)(i interface{}, e error){
  name := params.Args["name"].(string)
  newUser, err := models.CreateUser(name)
  if err!=nil{
    return nil, err
  }
  return newUser, nil
}

