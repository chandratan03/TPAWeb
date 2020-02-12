package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetHotelRoomByHotelId(params graphql.ResolveParams) (interface{}, error){
  hotelId := params.Args["hotelId"].(int)
  res,err := models.GetHotelRoomByHotelId(hotelId)
  if err!=nil{
    return nil, err
  }
  return res,nil
}

func GetHotelRooms(p graphql.ResolveParams)(interface{},error){
  res, err := models.GetHotelRooms()
  if err!=nil{
    return nil, err
  }
  return res, nil
}
