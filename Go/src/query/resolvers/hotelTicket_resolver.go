package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetHotelTickets(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetHotelTickets()
  return rows, nil
}
func GetHotelTicketsByDate(p graphql.ResolveParams)(interface{}, error){
  date := p.Args["date"].(string)

  rows := models.GetHotelTicketsByDate(date)
  return rows,nil
}

func GetHotelTicketById(p graphql.ResolveParams)(interface{}, error){
  id := p.Args["id"].(int)

  rows := models.GetHotelTicketById(id)
  return rows,nil
}
