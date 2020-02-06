package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetRegions(p graphql.ResolveParams) (i interface{}, err error){
  rows, err:= models.GetRegions()
  if err!=nil{
    return nil, err
  }

  return rows, nil
}
