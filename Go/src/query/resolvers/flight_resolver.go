package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetFlights(p graphql.ResolveParams)(interface{}, error){
  rows, err:= models.GetFlights()
  if err!=nil{
    return nil, err
  }

  return rows, nil
}

func GetFlightsByFromToDate(p graphql.ResolveParams)(i interface{}, e error){
  fromId := p.Args["fromId"].(int)
  toId := p.Args["toId"].(int)
  date := p.Args["date"].(string)
  rows, err := models.GetFlightByFromToDate(fromId, toId, date)
  if err!=nil{
    return nil, err
  }
  return rows, nil
}
