package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func CreateUser(params graphql.ResolveParams)(i interface{}, e error){
  firstName := params.Args["firstName"].(string)
  lastName := params.Args["lastName"].(string)
  password := params.Args["password"].(string)
  phoneNumber := params.Args["phoneNumber"].(string)
  email := params.Args["email"].(string)
  nationality := params.Args["nationality"].(string)
  newUser, err := models.CreateUser(firstName, lastName, password, email, phoneNumber, nationality)
  if err!=nil{
    return nil, err
  }
  return newUser, nil
}

