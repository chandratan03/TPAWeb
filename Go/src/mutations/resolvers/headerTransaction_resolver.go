package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertHeaderTransaction(params graphql.ResolveParams)(interface{}, error){
  var userId int

  if params.Args["userId"]!=nil{
    userId= params.Args["userId"].(int)
  }else{
    userId = 0
  }

  title := params.Args["title"].(string)
  name := params.Args["name"].(string)
  nationality:= params.Args["nationality"].(string)
  email:= params.Args["email"].(string)
  phoneNumber:= params.Args["phoneNumber"].(string)
  bankId := params.Args["bankId"].(int)
  bankNumber:= params.Args["bankNumber"].(string)
  //Title string,Name string,Email string,Nationality string,PhoneNumber string
  row := models.InsertHeaderTransaction(userId,title, name,email, nationality,phoneNumber, bankId, bankNumber)
  return row, nil
}

