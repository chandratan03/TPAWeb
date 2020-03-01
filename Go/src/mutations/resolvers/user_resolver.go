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
func UpdateUserById(params graphql.ResolveParams)(interface{}, error) {
  id := params.Args["id"].(int)
  firstName := params.Args["firstName"].(string)
  lastName := params.Args["lastName"].(string)
  email := params.Args["email"].(string)
  phoneNumber := params.Args["phoneNumber"].(string)
  nationality := params.Args["nationality"].(string)
  address := params.Args["address"].(string)
  cityId := params.Args["cityId"].(int)
  postCode := params.Args["postCode"].(string)
  gender := params.Args["gender"].(string)
  language:=params.Args["language"].(string)
  row := models.UpdateUserById(id, firstName, lastName, email, phoneNumber, nationality, address, cityId, postCode, gender, language)
  return row, nil
}


func UpdateVerifiedEmail(params graphql.ResolveParams) (interface{}, error){
  id:= params.Args["id"].(int)
  row:=models.UpdateVerifyEmail(id)
  return row,nil
}

func UpdateVerifiedPhone(params graphql.ResolveParams) (interface{}, error){
  id:= params.Args["id"].(int)
  row:=models.UpdateVerifyPhone(id)
  return row,nil
}



