package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

//UserId int
//FlightId int `json:"flight_id"`
//Flight Flight `json:"foreingKey:flight_id"`
//Quantity int
//Type string
//Date time.Time

func DeleteCartById(params graphql.ResolveParams)(interface{}, error){
  id:= params.Args["id"].(int)
  cart := models.DeleteCartById(id)
  return cart, nil
}

func InsertCart(params graphql.ResolveParams)(interface{}, error){
  userId:= params.Args["userId"].(int)
  flightId:= params.Args["flightId"].(int)
  quantity:= params.Args["quantity"].(int)
  _type := params.Args["type"].(string)
  date := params.Args["date"].(string)
  cart := models.InsertCart(userId, flightId, quantity, _type, date)

  return cart,nil

}
