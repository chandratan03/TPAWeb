package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetCars(params graphql.ResolveParams)(interface{}, error){
  rows, err := models.GetCars()
  if err !=nil{
    panic(err)
  }
  return rows, nil
}

func GetCarsByCity(params graphql.ResolveParams)(interface{}, error){
  cityId,ok:= params.Args["cityId"].(int)
  if ok{
    rows, err := models.GetCarsByCity(cityId)
    if err !=nil{
      panic(err)
    }
    return rows, nil
  }
  return nil, nil

}
