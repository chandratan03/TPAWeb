package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertDetailEvent(params graphql.ResolveParams)(interface{}, error){
  //HeaderId int, FlightId int, Quantity int, Type string
  headerId:= params.Args["headerId"].(int)
  entertainmentTicketId:= params.Args["entertainmentTicketId"].(int)
  quantity:= params.Args["quantity"].(int)
  _type :=params.Args["type"].(string)

  row:= models.InsertDetailEvent(headerId, entertainmentTicketId, quantity, _type)
  return row, nil
}
