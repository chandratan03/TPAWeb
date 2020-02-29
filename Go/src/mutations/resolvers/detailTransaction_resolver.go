package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertDetailTransaction(params graphql.ResolveParams)(interface{}, error){
  //HeaderId int, FlightId int, Quantity int, Type string
  headerId:= params.Args["headerId"].(int)
  flightId:= params.Args["flightId"].(int)
  quantity:= params.Args["quantity"].(int)
  _type :=params.Args["type"].(string)

  row:= models.InsertDetailTransaction(headerId, flightId, quantity, _type)
  return row, nil
}
