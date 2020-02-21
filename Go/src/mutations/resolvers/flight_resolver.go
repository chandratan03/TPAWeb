package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func CreateFlight(params graphql.ResolveParams)(interface{}, error){
  airlineRefer := params.Args["airlineRefer"].(int)
  var routeIds []int
  if params.Args["routesIds"] != nil{
    routeIds = params.Args["routeIds"].([]int)
  }
  transit := params.Args["transit"].(int)
  fromRefer:=params.Args["fromRefer"].(int)
  toRefer := params.Args["toRefer"].(int)
  departure := params.Args["departure"].(string)
  arrival := params.Args["arrival"].(string)
  duration:= params.Args["duration"].(int)
  price:=params.Args["price"].(int)
  tax:= params.Args["tax"].(int)
  serviceCharge := params.Args["serviceCharge"].(int)
  newFlight :=models.CreateFlight(airlineRefer,
    routeIds, transit, fromRefer, toRefer,
    departure, arrival, duration, price, tax,
    serviceCharge)
  return newFlight, nil
}


func UpdateFlight(params graphql.ResolveParams)(interface{}, error){
  id:=params.Args["id"].(int)
  airlineRefer := params.Args["airlineRefer"].(int)
  var routeIds []int
  if params.Args["routesIds"] != nil{
    routeIds = params.Args["routeIds"].([]int)
  }
  transit := params.Args["transit"].(int)
  fromRefer:=params.Args["fromRefer"].(int)
  toRefer := params.Args["toRefer"].(int)
  departure := params.Args["departure"].(string)
  arrival := params.Args["arrival"].(string)
  duration:= params.Args["duration"].(int)
  price:=params.Args["price"].(int)
  tax:= params.Args["tax"].(int)
  serviceCharge := params.Args["serviceCharge"].(int)
  newFlight :=models.UpdateFlight(id,airlineRefer,
    routeIds, transit, fromRefer, toRefer,
    departure, arrival, duration, price, tax,
    serviceCharge)
  return newFlight, nil
}

func DeleteFlight(params graphql.ResolveParams)(interface{}, error){
  id:=params.Args["id"].(int)
  models.DeleteFlight(id)
  return nil, nil
}
