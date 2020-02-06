package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetHotelFacilities(p graphql.ResolveParams) (interface{}, error){
  rows, err := models.GetHotelFacilities()
  if err!=nil{
    return nil, err
  }
  return rows, nil


}
