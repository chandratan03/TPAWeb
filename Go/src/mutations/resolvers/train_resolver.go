package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)
//TrainId:       uint(trainId),
//FromRefer:     uint(fromRefer),
//ToRefer:       uint(toRefer),
//Departure:     departureTime,
//Arrival:       arrivalTime,
//Duration:      uint(duration),
//Price:         price,
//Tax:           tax,
//ServiceCharge: serviceCharge,
func InsertTrain(params graphql.ResolveParams)(interface{}, error){
  trainId:= params.Args["trainId"].(int)
  fromRefer:= params.Args["fromRefer"].(int)
  toRefer:= params.Args["toRefer"].(int)
  departure:= params.Args["departure"].(string)
  arrival:= params.Args["arrival"].(string)
  duration := params.Args["trainId"].(int)
  price := params.Args["price"].(float64)
  tax :=params.Args["tax"].(float64)
  serviceCharge:=params.Args["serviceCharge"].(float64)
  rows := models.InsertTrainTrip(trainId, fromRefer, toRefer, departure, arrival, duration, price, tax, serviceCharge)
  return rows, nil

}
func DeleteTrainTrip(params graphql.ResolveParams)(interface{}, error){
  id:=params.Args["id"].(int)
  models.DeleteTrainTrip(id)
  return nil, nil
}
