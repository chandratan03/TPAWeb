package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetTrainTrips(params graphql.ResolveParams)(interface{}, error){
  rows, error := models.GetTrainTrips()
  if error!=nil{
    panic(error)
  }
  return rows, nil
}

func GetTrainTripsByFromToDate(params graphql.ResolveParams)(interface{}, error){
  fromId := params.Args["fromId"].(int)
  toId := params.Args["toId"].(int)
  date := params.Args["date"].(string)

  rows, error := models.GetTrainTripsByFromToDate(fromId, toId, date)
  if error!=nil{
    panic(error)
  }
  return rows, nil


}

