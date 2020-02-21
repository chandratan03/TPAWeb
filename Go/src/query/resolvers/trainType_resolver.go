package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetTrainTypes(params graphql.ResolveParams)(interface{}, error){
  rows,err:=models.GetTrainTypes()
  if err!=nil{
    panic(err)
  }
  return rows, nil
}
