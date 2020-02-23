package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

//hotelId int, date string, quantity int, price float64

func InsertHotelTicket(params graphql.ResolveParams)(interface{}, error){
  hotelId:= params.Args["hotelId"].(int)
  date:= params.Args["date"].(string)
  quantity := params.Args["quantity"].(int)
  price := params.Args["price"].(float64)

  row, error := models.InsertHotelTicket(hotelId, date, quantity, price)
  if error!=nil{
    return nil, nil
  }
  return row,nil
}


func UpdateHotelTicket(params graphql.ResolveParams)(interface{}, error){
  id := params.Args["id"].(int)
  hotelId:= params.Args["hotelId"].(int)
  date:= params.Args["date"].(string)
  quantity := params.Args["quantity"].(int)
  price := params.Args["price"].(float64)

  row, error := models.UpdateHotelTicket(id,hotelId, date, quantity, price)
  if error!=nil{
    return nil, nil
  }
  return row,nil
}


func DeleteHotelTicket(params graphql.ResolveParams)(interface{}, error){
  id:=params.Args["id"].(int)
  row := models.DeleteHotelTicket(id)
  return row, nil
}
