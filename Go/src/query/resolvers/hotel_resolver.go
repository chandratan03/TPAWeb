package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetHotels (p graphql.ResolveParams)(i interface{}, err error){
  hotels, err := models.GetHotels()
  if err!=nil{

    return nil, err
  }
  return hotels, nil
}

func GetHotelById(p graphql.ResolveParams)(i interface{}, err error){
  hotelId := p.Args["hotelId"].(int)
  res,err := models.GetHotelById(uint(hotelId))
  if err!=nil{
    return nil, err
  }
  return res,nil
}
