package resolvers

import "github.com/graphql-go/graphql"

func GetUsers(p graphql.ResolveParams)(i interface{}, e error){
  return nil, nil
}

func GetUser(p graphql.ResolveParams)(i interface{}, e error){
  id, ok := p.Args["id"].(int)
  if ok{
    return id, nil
  }
  return nil, nil
}
