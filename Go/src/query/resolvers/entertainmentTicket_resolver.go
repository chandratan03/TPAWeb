package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetEntertainmentTickets(params graphql.ResolveParams)(interface{}, error){
  rows:= models.GetEntertainmentTickets()
  return rows, nil
}


func GetEntertainmentTicketById(params graphql.ResolveParams)(interface{}, error){
  id:= params.Args["id"].(int)
  rows:= models.GetEntertainmentTicketById(id)
  return rows, nil
}
func GetEntertainmentTicketsByCategory(params graphql.ResolveParams)(interface{}, error){
  category := params.Args["category"].(string)
  rows:= models.GetEntertainmentTicketByCategory(category)
  return rows, nil
}


func GetEntertainmentTicketsByCategoryAndCityId(params graphql.ResolveParams)(interface{}, error){
  category := params.Args["category"].(string)
  cityId := params.Args["cityId"].(int)
  rows:= models.GetEntertainmentTicketByCategoryAndCityId(category, cityId)
  return rows, nil
}

func GetEntertainmentTicketsByCityId(params graphql.ResolveParams)(interface{}, error){
  cityId := params.Args["cityId"].(int)
  rows:= models.GetEntertainmentTicketByCityId(cityId)
  return rows, nil
}

func GetEntertainmentTicketsByEntertainmentIdAndDate(params graphql.ResolveParams)(interface{}, error){
  entertainmentId := params.Args["entertainmentId"].(int)
  date := params.Args["date"].(string)
  rows:= models.GetEntertainmentTicketByEntertainmentIdAndDate(date, entertainmentId)
  return rows, nil
}
