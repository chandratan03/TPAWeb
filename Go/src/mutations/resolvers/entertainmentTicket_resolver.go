package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertEntertainmentTicket(params graphql.ResolveParams)(interface{}, error){
  date:= params.Args["date"].(string)
  entertainmentId := params.Args["entertainmentId"].(int)
  price:= params.Args["price"].(float64)
  discountPercentage := params.Args["discountPercentage"].(int)

  row := models.InsertEntertainmentTicket(date, entertainmentId, price, discountPercentage)


  return row, nil
}

func DeleteEntertainmentTicketByEntertainmentId(params graphql.ResolveParams)(interface{}, error){
  entertainmentId := params.Args["entertainmentId"].(int)
  row := models.DeleteEntertainmentTicketById(entertainmentId)
  return row, nil
}


func DeleteEntertainmentTicketById(params graphql.ResolveParams)(interface{}, error){
  id := params.Args["id"].(int)
  row := models.DeleteEntertainmentTicketById(id)
  return row, nil
}
