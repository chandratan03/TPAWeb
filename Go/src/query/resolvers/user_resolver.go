package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
  //"models"
)

func GetUsers(p graphql.ResolveParams)(i interface{}, e error){
  rows, err := models.GetUsers()
  if err!=nil{
    return nil, nil
  }
  return rows, nil
}

func GetUser(p graphql.ResolveParams)(i interface{}, e error){
  id, ok := p.Args["id"].(int)
  if ok{
    res, err := models.GetUser(uint(id))
    if err!=nil {
      return nil, nil
    }
    return res, nil
  }
  return nil, nil
}

func GetUserByEmail(p graphql.ResolveParams)(i interface{}, e error){
  email, ok:= p.Args["email"].(string)
  if ok{
    res, err := models.GetUserByEmail(email)
    if err!=nil{
      return nil, nil
    }
    return res, nil
  }
  return nil, nil
}

func GetUserByEmailAndPassword(p graphql.ResolveParams)(i interface{}, e error){
  email, ok:= p.Args["email"].(string)
  password, ok2:= p.Args["password"].(string)
  if ok && ok2{
    res, err := models.GetUserByEmailAndPassword(email, password)
    if err !=nil{
      return nil, nil
    }
    return res, nil
  }
  return nil, nil


}
