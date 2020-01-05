package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
  //"models"
)

func GetUsers(p graphql.ResolveParams)(i interface{}, e error){
  rows, err := models.GetAll()
  if err!=nil{
    return nil, nil
  }
  return rows, nil
}

func GetUser(p graphql.ResolveParams)(i interface{}, e error){
  id, ok := p.Args["id"].(int)
  if ok{
    res, err := models.Get(uint(id))
    if err!=nil {
      return nil, nil
    }
    return res, nil
  }
  return nil, nil
}
