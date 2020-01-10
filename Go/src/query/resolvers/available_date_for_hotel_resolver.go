package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetAvailableDateForHotels(p graphql.ResolveParams)(i interface{}, e error){
  dates, err := models.GetAvailableDateForHotels()
  if err!=nil{
    return nil, err
  }
  return dates, nil
}
