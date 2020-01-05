package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func CreateUser(params graphql.ResolveParams)(i interface{}, e error){
  firstName := params.Args["firstName"].(string)
  lastName := params.Args["lastName"].(string)
  password := params.Args["firstName"].(string)
  phoneNumber := params.Args["firstName"].(string)
  email := params.Args["firstName"].(string)

  newUser, err := models.CreateUser(firstName, lastName, password, email, phoneNumber)
  if err!=nil{
    return nil, err
  }
  return newUser, nil
}

